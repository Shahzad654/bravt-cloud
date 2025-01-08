import { useParams } from "react-router-dom";
import { useGetInstanceByIdQuery } from "../../redux/apis/queriesSlice";
import { format, subDays } from "date-fns";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./Chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useMemo } from "react";
import { Card } from "antd";

const chartConfig = {
  received: {
    label: "Bytes Received",
    color: "var(--primary-color)",
  },
  sent: {
    label: "Bytes Sent",
    color: "#e76e50",
  },
};

const BandwidthUsage = () => {
  const { instanceId } = useParams();
  const { data } = useGetInstanceByIdQuery(instanceId);

  const chartData = useMemo(() => {
    if (!data?.bandwidthUsage) return [];

    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), 29 - i);
      return format(date, "yyyy-MM-dd");
    });

    return last30Days.map((date) => {
      const usage = data.bandwidthUsage[date] || {
        incoming_bytes: 0,
        outgoing_bytes: 0,
      };
      return {
        date,
        received: usage.incoming_bytes,
        sent: usage.outgoing_bytes,
      };
    });
  }, [data?.bandwidthUsage]);

  return (
    <Card className="border rounded-xl col-span-2 shadow-sm">
      <Card.Meta title="Monthly Bandwidth" description="Last 30 days" />
      <ChartContainer config={chartConfig} className="mt-4">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            interval={3}
            tickFormatter={(value) => format(value, "dd MMM")}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar dataKey="received" fill="var(--color-received)" radius={4} />
          <Bar dataKey="sent" fill="var(--color-sent)" radius={4} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
};

export default BandwidthUsage;

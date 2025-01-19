import { useParams } from "react-router-dom";
import { useGetInstanceByIdQuery } from "../../redux/apis/instances";
import { PieChart, Pie, Label } from "recharts";
import { useMemo } from "react";
import { Card } from "antd";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./Chart";
import { useGetSessionQuery } from "../../redux/apis/auth";

const chartConfig = {
  credits: {
    label: "Credits",
  },
  remaining: {
    label: "Current balance",
    color: "var(--primary-color)",
  },
  consumed: {
    label: "Instance Usage",
    color: "#e76e50",
  },
};

const CreditsUsage = () => {
  const { instanceId } = useParams();
  const { data } = useGetInstanceByIdQuery(instanceId);

  const { data: user } = useGetSessionQuery();

  const chartData = useMemo(() => {
    if (!data) return [];

    const consumed = data.creditsConsumed || 0;
    const remaining = user.credits || 0;

    return [
      {
        name: "Instance Usage",
        value: Number(consumed),
        fill: "var(--color-consumed)",
      },
      {
        name: "Current Balance",
        value: Number(remaining),
        fill: "var(--color-remaining)",
      },
    ];
  }, [data, user]);

  return (
    <Card className="col-span-1 border shadow-sm rounded-xl h-fit">
      <Card.Meta
        title="Credits Usage"
        description="Credits Consumed vs Remaining"
      />

      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="text-2xl font-bold fill-black"
                      >
                        {user.credits}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-zinc-500"
                      >
                        Credits
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </Card>
  );
};

export default CreditsUsage;

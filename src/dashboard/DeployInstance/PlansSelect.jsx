import { useEffect, useMemo } from "react";
import { Table } from "antd";

import { formatPrice } from "../../utils/helpers";
import { useGetPlansQuery } from "../../redux/apis/instances";
import { useQueryState } from "nuqs";

const PlansSelect = ({ value, onValueChange, region }) => {
  const [queryPlan] = useQueryState("selected_plan");
  const { data, isLoading } = useGetPlansQuery(region);

  const plan = useMemo(() => {
    return data?.find((p) => p.plan === value);
  }, [data, value]);

  useEffect(() => {
    if (!data?.length || value) return;

    if (queryPlan) {
      const qPlan = data?.find((p) => p.id === queryPlan);
      if (qPlan) {
        onValueChange(qPlan.plan);
        return;
      }
    }

    if (!plan) {
      onValueChange(data[0]?.plan);
    }
  }, [data, plan, queryPlan, value, onValueChange]);

  const columns = [
    {
      title: "Name",
      dataIndex: "plan",
      render: (val) => (
        <span style={{ fontSize: "14px", fontWeight: "500" }}>{val}</span>
      ),
    },
    {
      title: "Cores",
      dataIndex: "type",
      render: (val, record) => (
        <span style={{ fontSize: "14px", color: "#71717a", fontWeight: "500" }}>
          {record.vcpu_count} {val}
        </span>
      ),
    },
    {
      title: "Memory",
      dataIndex: "ram",
      render: (val) => (
        <span style={{ fontSize: "14px", color: "#71717a", fontWeight: "500" }}>
          {val / 1024} GB
        </span>
      ),
    },
    {
      title: "Disk",
      dataIndex: "disk",
      render: (val) => (
        <span style={{ fontSize: "14px", color: "#71717a", fontWeight: "500" }}>
          {val} GB NVMe
        </span>
      ),
    },
    {
      title: "Bandwidth",
      dataIndex: "bandwidth",
      render: (val) => (
        <span style={{ fontSize: "14px", color: "#71717a", fontWeight: "500" }}>
          {val / 1024} TB
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (_, record) => (
        <div>
          <strong>{formatPrice(record.monthlyCost)}/mon</strong>
          <p style={{ fontSize: "14px" }}>
            {formatPrice(record.hourlyCost)}/hr
          </p>
        </div>
      ),
    },
  ];

  const plansWithKey = useMemo(() => {
    return data?.map((item, index) => ({
      key: index,
      ...item,
    }));
  }, [data]);

  return (
    <>
      <h4 style={{ marginTop: "20px" }}>Plans</h4>
      <Table
        columns={columns}
        dataSource={plansWithKey}
        loading={isLoading}
        pagination={false}
        rowClassName="cursor-pointer"
        rowSelection={{
          type: "radio",
          onSelect: (row) => onValueChange(row.plan),
          selectedRowKeys: plan
            ? [data.findIndex((row) => row.plan === plan.plan)]
            : [],
        }}
        onRow={(record) => ({
          onClick: () => onValueChange(record.plan),
        })}
      />
    </>
  );
};

export default PlansSelect;

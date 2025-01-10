import { useEffect, useMemo } from "react";
import { Table } from "antd";

import { formatPrice } from "../../utils/helpers";
import { useGetPlansQuery } from "../../redux/apis/apiSlice";

const PlansSelect = ({ value, onValueChange, region }) => {
  const { data, isLoading } = useGetPlansQuery(region);

  const plan = useMemo(() => {
    return data?.find((p) => p.id === value);
  }, [data, value]);

  useEffect(() => {
    if (data?.length && !plan) {
      onValueChange(data[0]?.id);
    }
  }, [data, plan, onValueChange]);

  const columns = [
    {
      title: "Name",
      dataIndex: "id",
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
          <strong>{formatPrice(record.monthly_cost)}/mon</strong>
          <p style={{ fontSize: "14px" }}>
            {formatPrice(record.hourly_cost)}/hr
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
          onSelect: (row) => onValueChange(row.id),
          selectedRowKeys: plan
            ? [data.findIndex((row) => row.id === plan.id)]
            : [],
        }}
        onRow={(record) => ({
          onClick: () => onValueChange(record.id),
        })}
      />
    </>
  );
};

export default PlansSelect;

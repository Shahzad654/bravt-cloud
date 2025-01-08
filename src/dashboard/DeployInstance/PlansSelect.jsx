import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";

import { fetchPlans } from "../../redux/apis/plansSlice";
import { formatPrice } from "../../utils/helpers";

const PlansSelect = ({ value, onValueChange, region }) => {
  const dispatch = useDispatch();
  const { plans, status } = useSelector((state) => state.plans);

  useEffect(() => {
    dispatch(fetchPlans(region));
  }, [dispatch, region]);

  const plan = useMemo(() => {
    return plans.find((p) => p.id === value);
  }, [plans, value]);

  useEffect(() => {
    if (plans.length && !plan) {
      onValueChange(plans[0].id);
    }
  }, [plans, plan, onValueChange]);

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
    return plans?.map((item, index) => ({
      key: index,
      ...item,
    }));
  }, [plans]);

  return (
    <>
      <h4 style={{ marginTop: "20px" }}>Plans</h4>
      <Table
        columns={columns}
        dataSource={plansWithKey}
        loading={status === "loading"}
        pagination={false}
        rowClassName="cursor-pointer"
        rowSelection={{
          type: "radio",
          onSelect: (row) => onValueChange(row.id),
          selectedRowKeys: plan
            ? [plans.findIndex((row) => row.id === plan.id)]
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

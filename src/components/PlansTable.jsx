import { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlanId } from "../redux/apis/planSlice"; // Import your thunk

const MyTable = () => {
  const dispatch = useDispatch();
  const { plan, status, error } = useSelector((state) => state.plan); // Select plan state from Redux
  const [selectedRowKey, setSelectedRowKey] = useState(null); // State to manage the selected row key

  useEffect(() => {
    dispatch(fetchPlanId("fra")); // Dispatch the fetchPlanId thunk with the "fra" region
  }, [dispatch]);

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div
          style={{
            cursor: "pointer",
            backgroundColor: selectedRowKey === record.key ? "#6ABBE9" : "transparent", // Highlight the selected row
            padding: "8px",
          }}
          onClick={() => handleRowClick(record.key)} // Handle the row click
        >
          {text}
        </div>
      ),
    },
    {
      title: "Cores",
      dataIndex: "cores",
      key: "cores",
      render: (text, record) => (
        <div
          style={{
            cursor: "pointer",
            backgroundColor: selectedRowKey === record.key ? "#6ABBE9" : "transparent", // Highlight the selected row
            padding: "8px",
          }}
          onClick={() => handleRowClick(record.key)} // Handle the row click
        >
          {text}
        </div>
      ),
    },
    {
      title: "Memory",
      dataIndex: "memory",
      key: "memory",
      render: (text, record) => (
        <div
          style={{
            cursor: "pointer",
            backgroundColor: selectedRowKey === record.key ? "#6ABBE9" : "transparent", // Highlight the selected row
            padding: "8px",
          }}
          onClick={() => handleRowClick(record.key)} // Handle the row click
        >
          {text}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <div
          style={{
            cursor: "pointer",
            backgroundColor: selectedRowKey === record.key ? "#6ABBE9" : "transparent", // Highlight the selected row
            textAlign: "center",
            // padding: "8px",
          }}
          onClick={() => handleRowClick(record.key)} // Handle the row click
        >
          <div>
            <strong>{record.monthly_cost}/mon</strong>
          </div>
          <div>{record.hourly_cost}/hr</div>
        </div>
      ),
    },
  ];

  // Loading state and data handling
  if (status === "loading") return <Spin tip="Loading..." />;
  if (status === "error") return <p>Error: {error}</p>;

  // Format data if necessary (assuming planId contains data for table rows)
  const formattedData = Array.isArray(plan.data)
    ? plan.data.map((item, index) => ({
        key: index,
        name: item.id,
        cores: item.type,
        memory: item.id.split("-")[2].toUpperCase(),
        monthly_cost: item.monthly_cost, // Add this field
        hourly_cost: item.hourly_cost.toFixed(3),
      }))
    : [];

  // Handle row click
  const handleRowClick = (key) => {
    setSelectedRowKey(key === selectedRowKey ? null : key); // Toggle selection on click
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={formattedData}
        rowSelection={null} // Disable built-in row selection
        style={{ margin: "0 38px" }}
      />
    </div>
  );
};

export default MyTable;

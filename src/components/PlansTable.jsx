import { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import axios from "axios";

const MyTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/resources"); // Replace with your API endpoint
      const formattedData = response.data.map((item, index) => ({
        key: index,
        name: item.name,
        cores: item.cores,
        memory: item.memory,
        storage: item.storage,
        price: item.price,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Cores",
      dataIndex: "cores",
      key: "cores",
    },
    {
      title: "Memory",
      dataIndex: "memory",
      key: "memory",
    },
    {
      title: "Storage",
      dataIndex: "storage",
      key: "storage",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <div>
      {loading ? (
        <Spin tip='Loading...' />
      ) : (
        <Table columns={columns} dataSource={data} />
      )}
    </div>
  );
};

export default MyTable;

import { Alert, Button, Input, Table, Tag } from "antd";
import { useState } from "react";

const SnapShots = () => {
  const [labelInput, setLabelInput] = useState("");
  const [dataSource, setDataSource] = useState([
    {
      key: "1",
      name: "Server A",
      os: "Linux",
      date: "2025-01-08",
      status: "Active",
    },
    {
      key: "2",
      name: "Server B",
      os: "Windows",
      date: "2025-01-07",
      status: "Inactive",
    },
    {
      key: "3",
      name: "Server C",
      os: "MacOS",
      date: "2025-01-06",
      status: "Active",
    },
  ]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "OS",
      dataIndex: "os",
      key: "os",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <Alert
          message='Please note:'
          description='Your server may still be finishing installing and booting up during the first few minutes of activation. If the server does not ping, you can view the console to monitor progress.'
          type='warning'
          showIcon
        />
      </div>
      <div style={{ padding: "20px" }}>
        <div style={{ padding: "20px" }}>
          <h4>Take Snapshot</h4>
          <div style={{ border: "1px solid #d3d3d3", width:"500px", padding:"20px", marginTop:"30px" }}>
         <div
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Input
              placeholder='label'
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              style={{ width: "300px", marginRight: "10px" }}
            />
            <Button
              type='primary'
              style={{ width: "250px", marginRight: "10px", height:"40px" }}
            >
              Take Snapshot
            </Button>
          </div>
          <ul style={{ fontSize: "12px", color: "grey" }}>
            <li>
              Stored snapshots will cost $0.05/GB per month - pricing subject to
              change.
            </li>
            <li>
              Stored snapshots will cost $0.05/GB per month - pricing subject to
              change.
            </li>
            <li>
              Stored snapshots will cost $0.05/GB per month - pricing subject to
              change.
            </li>
          </ul>
         </div>
          <h4 style={{marginTop:"40px"}}>Restore Snapshot</h4>
          <div style={{ padding: "20px" }}>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnapShots;

import { Table, Space, message, App, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import DashHeader from "../../components/DashHeader";
import {
  useListSSHKeysQuery,
  useDeleteSSHMutation,
} from "../../redux/apis/ssh";
import { formatDate } from "../../utils/helpers";

const SSHKeyTable = () => {
  const navigate = useNavigate();
  const { modal } = App.useApp();

  const { data: sshKeys, isLoading } = useListSSHKeysQuery();
  const [deleteSShKey] = useDeleteSSHMutation();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date Created",
      dataIndex: "date_created",
      key: "date_created",
      render: formatDate,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => handleEdit(record)}
          />
          <button
            style={{
              backgroundColor: "transparent",
              border: 0,
            }}
            onClick={() => {
              modal.error({
                title: "Are you absolutely sure?",
                content: `SSH Key "${record.name}" will be deleted permanently. This action can't be undone!`,
                okText: "Delete",
                okCancel: true,
                okButtonProps: { color: "danger" },
                onOk: async () => {
                  const { error } = await deleteSShKey({
                    id: record.id,
                  });

                  if (error) {
                    message.error(
                      error.data.message || `Failed to delete ssh Key!`
                    );
                  } else {
                    message.success(`SSH Key deleted successfully!`);
                  }
                },
              });
            }}
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    console.log("Edit:", record);
    navigate(`/ssh-keys/${record.id}`);
  };

  return (
    <>
      <DashHeader />
      <div style={{ margin: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4>SSH Keys</h4>
          <Link to="/ssh-keys/add">
            <Button type="primary">+ Add SSH Key</Button>
          </Link>
        </div>

        <Table
          columns={columns}
          dataSource={sshKeys}
          loading={isLoading}
          pagination={{ pageSize: 5 }}
          style={{ width: "100%", marginTop: "25px" }}
          rowKey="id" // Use unique key (e.g., id)
        />
      </div>
    </>
  );
};

export default SSHKeyTable;

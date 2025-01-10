import  { useState, useEffect } from "react";
import { Table, Space, Modal, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteSshKey, getAllSshKeys } from "../../redux/apis/getAllShhSlice";
// import { getAllSshKeys, deleteSshKey } from "../../redux/features/vultr/vultrSshSlice"; // Import actions

const SSHKeyTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Getting data from Redux state
  const { sshKeys, status, error } = useSelector((state) => state.getAllShh);
  
  // Fetch SSH keys when component mounts
  useEffect(() => {
    dispatch(getAllSshKeys());
  }, [dispatch]);

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
          <DeleteOutlined
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => showDeleteModal(record)}
          />
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    console.log("Edit:", record);
    navigate(`/updateSHH/${record.id}`);
  };

  const showDeleteModal = (record) => {
    setSelectedKey(record);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    if (selectedKey) {
      dispatch(deleteSshKey(selectedKey.id)) // Dispatch delete action
        .then(() => {
          // Refresh the SSH keys list after deletion
          dispatch(getAllSshKeys());
          setIsModalVisible(false);
          message.success("SSH Key deleted successfully");
        })
        .catch(() => {
          message.error("Failed to delete SSH Key");
        });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Display error message if status is error
  useEffect(() => {
    if (status === "error" && error) {
      message.error(`Error: ${error}`);
    }
  }, [status, error]);

  return (
    <div style={{ margin: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4>SSH Keys</h4>
        <Link to="/addSHH" style={{ textDecoration: "none", fontSize: "15px", color: "blue" }}>
          + Add SSH Key
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={sshKeys}
        pagination={{ pageSize: 5 }}
        style={{ width: "100%" }}
        rowKey="id" // Use unique key (e.g., id)
      />

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <p>
          Are you sure you want to delete this key? This will not remove the key from any machines that already have it.
        </p>
        <p><strong>SSH Key:</strong> {selectedKey?.name}</p>
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <Button onClick={handleCancel} style={{ marginRight: "10px" }}>
            Cancel
          </Button>
          <Button type="primary" danger onClick={handleDelete}>
            Delete SSH Key
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SSHKeyTable;

import { Button, Input, message, Spin } from "antd";
import DashHeader from "../../components/DashHeader";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSSHKeyQuery, useUpdateSSHMutation } from "../../redux/apis/ssh";

const { TextArea } = Input;

const UpdateSHH = () => {
  const { id } = useParams();

  const { data: sshKey, status } = useGetSSHKeyQuery(id);

  const navigate = useNavigate();

  // Local state for form inputs
  const [name, setName] = useState("");
  const [key, setKey] = useState("");

  // State from Redux

  const [updateSSH, { isLoading }] = useUpdateSSHMutation();

  // Filter the relevant SSH key by id and set the form values
  useEffect(() => {
    if (sshKey) {
      setName(sshKey.name);
      setKey(sshKey.ssh_key);
    }
  }, [sshKey, id]);

  // Handle updating the SSH key
  const handleUpdateSshKey = async () => {
    // Validate inputs
    if (!name || !key) {
      message.error("Please provide both name and SSH key.");
      return;
    }

    const { error } = await updateSSH({ id, name, key });
    if (error) {
      message.error(error.data.message);
    } else {
      setKey("");
      setName("");
      navigate("/ssh-keys");
      message.success("SSH key updated");
    }
  };

  if (status === "pending") {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "360px",
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div>
      <DashHeader />
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
        <Input
          placeholder="Name"
          style={{ marginBottom: "16px" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextArea
          placeholder="ssh-rsa AAAA... you@example.com"
          size="large"
          rows={4}
          style={{ marginBottom: "16px" }}
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <Button
          type="primary"
          block
          onClick={handleUpdateSshKey}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update SSH Key"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateSHH;

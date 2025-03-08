import { Button, Input, message } from "antd";
import DashHeader from "../../components/DashHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSSHMutation } from "../../redux/apis/ssh";

const { TextArea } = Input;

const AddSHH = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [key, setKey] = useState("");

  const [addSSH, { isLoading }] = useCreateSSHMutation();

  // Handle creating SSH key and navigating
  const handleCreateSshKey = async () => {
    if (!name || !key) {
      message.error("Please provide both name and SSH key.");
      return;
    }

    const { error } = await addSSH({ name, key });
    if (error) {
      message.error(error.data.message);
    } else {
      setKey("");
      setName("");
      navigate("/ssh-keys");
      message.success("SSH key created");
    }
  };

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
          onClick={handleCreateSshKey}
          disabled={isLoading}
        >
          {isLoading === "loading" ? "Adding..." : "Add SSH Key"}
        </Button>
      </div>
    </div>
  );
};

export default AddSHH;

import { Button, Input, message } from "antd";
import DashHeader from "../../components/DashHeader";
import { clearError, clearSshKey, clearStatus, createSshKey } from "../../redux/apis/createShhSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { clearError, clearSshKey } from "../../redux/features/vultr/vultrSshSlice";

const { TextArea } = Input;

const AddSHH = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state for form inputs
  const [name, setName] = useState("");
  const [key, setKey] = useState("");

  // State from Redux
  const { status, error } = useSelector((state) => state.createShh);
console.log("status",status);

  // Reset form after successful SSH key creation
  const resetForm = () => {
    setName("");
    setKey("");
  };

  // Handle creating SSH key and navigating
  const handleCreateSshKey = () => {
    // Validate inputs
    if (!name || !key) {
      message.error("Please provide both name and SSH key.");
      return;
    }

    // Dispatch action to create SSH key
    dispatch(createSshKey({ name, key }));
  };

  // Handle loading, success, and error states
  useEffect(() => {
    if (status === "loading") {
      message.loading("Creating SSH Key...");
    } else if (status === "error" && error) {
      message.error(`Error: ${error}`);
      dispatch(clearError()); // Clear error after showing it
    } else if (status === "succeeded") {
      message.success("SSH Key created successfully!");
      resetForm(); // Reset form fields
      dispatch(clearSshKey())
      dispatch(clearStatus()); // Clear SSH key if any
      navigate("/shhDetails"); // Navigate to SSH details page
    }
  }, [status, error, dispatch, navigate]);

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
          disabled={status === "loading"}
        >
          {status === "loading" ? "Adding..." : "Add SSH Key"}
        </Button>
      </div>
    </div>
  );
};

export default AddSHH;

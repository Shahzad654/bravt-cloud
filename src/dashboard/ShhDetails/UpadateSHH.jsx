import { Button, Input, message } from "antd";
import DashHeader from "../../components/DashHeader";
import {
  clearError,
  clearSshKey,
  clearStatus,
  updateSshKey,
} from "../../redux/apis/createShhSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllSshKeys } from "../../redux/apis/getAllShhSlice";

const { TextArea } = Input;

const UpdateSHH = () => {
  const { id } = useParams();
  console.log("id", id);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state for form inputs
  const [name, setName] = useState("");
  const [key, setKey] = useState("");

  // State from Redux
  const { status, error } = useSelector((state) => state.createShh);
  const { sshKeys } = useSelector((state) =>{ 
    console.log("state",state);
    
    return state.getAllShh});
  console.log("sshKeys",sshKeys);
  
  console.log("status", status);

  // Reset form after successful SSH key update
  const resetForm = () => {
    setName("");
    setKey("");
  };

  // Fetch SSH keys on component mount
  useEffect(() => {
    dispatch(getAllSshKeys());
  }, [dispatch]);

  // Filter the relevant SSH key by id and set the form values
  useEffect(() => {
    if (sshKeys && sshKeys.length > 0) {
      const selectedKey = sshKeys.find((key) => key.id === id);
      if (selectedKey) {
        setName(selectedKey.name);
        setKey(selectedKey.ssh_key);
      }
    }
  }, [sshKeys, id]);

  // Handle updating the SSH key
  const handleUpdateSshKey = () => {
    // Validate inputs
    if (!name || !key) {
      message.error("Please provide both name and SSH key.");
      return;
    }

    // Dispatch action to update the SSH key
    dispatch(updateSshKey({ name, key, sshID: id }));
  };

  // Handle loading, success, and error states
  useEffect(() => {
    if (status === "loading") {
      message.loading("Updating SSH Key...");
    } else if (status === "error" && error) {
      message.error(`Error: ${error}`);
      dispatch(clearError()); // Clear error after showing it
    } else if (status === "succeeded") {
      message.success("SSH Key Updated successfully!");
      resetForm(); // Reset form fields
      dispatch(clearSshKey());
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
          onClick={handleUpdateSshKey}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Updating..." : "Update SSH Key"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateSHH;

import { useState } from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { useSendPasswordResetVerificationMutation } from "../redux/apis/auth";
import { message, notification } from "antd";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sendVerification, { isLoading }] =
    useSendPasswordResetVerificationMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await sendVerification({ email });

    if (error) {
      message.error(error.data.message);
    } else {
      notification.success({
        message: "Check your email",
        description: "We've sent you a verification link",
      });
    }
  };

  return (
    <Main>
      <StyledForm>
        <h3>Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? (
              <CircularProgress size={18} style={{ color: "white" }} />
            ) : (
              "Send Email"
            )}
          </button>
        </form>
      </StyledForm>
    </Main>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledForm = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
      font-size: 14px;
      color: #555;
    }

    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }
`;

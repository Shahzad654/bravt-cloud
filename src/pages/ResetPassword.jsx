import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useResetPasswordMutation } from "../redux/apis/auth";
import { message } from "antd";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      message.error("Please fill all the fields");
      return;
    }

    if (password.length < 8) {
      message.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      message.error("Passwords don't match");
      return;
    }

    const { error } = await resetPassword({
      token,
      email,
      newPassword: password,
      confirmPassword,
    });

    if (error) {
      message.error(error.data.message);
      return;
    }

    navigate("/login");
    message.success("Password reset successfully!");
  };

  if (!email) {
    throw new Error("Something is wrong, try again!");
  }

  return (
    <Main>
      <StyledSignUp>
        <div className="form-container">
          <h3>Reset Password</h3>
          <div className="form-detail">
            <label htmlFor="password">New Password</label>
            <br />
            <input
              type="password"
              name="password"
              required
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn"
            >
              {isLoading ? "Resetting..." : "Reset"}
            </button>
          </div>
        </div>
      </StyledSignUp>
    </Main>
  );
}

const Main = styled.div`
  background-color: var(--bg-color);
  height: 120vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    max-width: 200px;
    height: auto;
  }

  @media (max-width: 640px) {
    height: 100vh;
  }
`;

const StyledSignUp = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  border-radius: var(--l-radius);
  padding: 30px 30px;

  .form-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 2rem;
    .form-detail {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      span {
        color: var(--primary-color);
      }
      button {
        min-width: 250px;
      }
    }
  }

  @media (max-width: 640px) {
    width: 90%;
    margin: auto;
    .form-container {
      align-items: center;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

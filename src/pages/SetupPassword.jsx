import { useState } from "react";
import styled from "styled-components";
import LoginImg from "../assets/images/signup.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "../components/Logo";
import {
  useGetSessionQuery,
  useSetupPasswordMutation,
} from "../redux/apis/auth";
import { message } from "antd";

export default function SetupPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [setupPassword, { isLoading }] = useSetupPasswordMutation();

  const { data: user } = useGetSessionQuery();

  if (!user.initial) {
    <Navigate to="/instance" replace />;
  }

  const handleSetupPassword = async (e) => {
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

    const { error } = await setupPassword({
      newPassword: password,
      confirmPassword,
    });

    if (error) {
      message.error(error.data.message);
      return;
    }

    navigate("/billing-info");
  };

  return (
    <Main>
      <Logo size={250} style={{ marginTop: "24px" }} />
      <StyledSignUp>
        <div className="form-container">
          <div>
            <h3>Setup your password</h3>
            <p
              style={{
                fontSize: "14px",
                color: "gray",
              }}
            >
              Enter a secure password for future sign in
            </p>
          </div>
          <form className="form-detail" onSubmit={handleSetupPassword}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="btn"
              type="submit"
              disabled={isLoading}
              style={{ marginTop: "20px", height: "36px" }}
            >
              {isLoading ? (
                <CircularProgress size={18} style={{ color: "inherit" }} />
              ) : (
                "Save"
              )}
            </button>
          </form>
        </div>

        <div className="image-container">
          <img src={LoginImg} alt="" />
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

  .image-container {
    img {
      max-width: 500px;
      height: auto;
    }
  }

  @media (max-width: 640px) {
    width: 90%;
    margin: auto;
    .form-container {
      align-items: center;
    }
    .image-container {
      img {
        display: none;
      }
    }
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    width: 80%;
    margin: auto;
  }
`;

import { useState } from "react";
import styled from "styled-components";
import LoginImg from "../assets/images/signup.jpg";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "../components/Logo";
import { useSendVerificationMutation } from "../redux/apis/auth";
import { message } from "antd";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const [sendVerification, { isLoading }] = useSendVerificationMutation();

  const handleSendCode = async (e) => {
    e.preventDefault();

    if (!email) {
      message.error("Please enter a valid email.");
      return;
    }

    const { error } = await sendVerification({ email });
    if (error) {
      message.error(error.data.message);
      return;
    }

    navigate(`/verify-code?email=${email}`);
  };

  return (
    <Main>
      <Logo size={250} style={{ marginTop: "24px" }} />
      <StyledSignUp>
        <div className="form-container">
          <h3>Sign Up with Email</h3>
          <form className="form-detail" onSubmit={handleSendCode}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="btn"
              type="submit"
              disabled={isLoading || !email}
              style={{ marginTop: "20px", height: "36px" }}
            >
              {isLoading ? (
                <CircularProgress size={18} style={{ color: "inherit" }} />
              ) : (
                "Continue"
              )}
            </button>

            <br />
            <p>
              I have an account{" "}
              <Link to="/login">
                <span>Sign In</span>
              </Link>
            </p>
            <br />
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

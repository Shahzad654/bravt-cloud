import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import LoginImg from "../assets/images/login.jpg";
import Logo from "../components/Logo";
import SignInWithoutEmail from "../components/SignInwithoutEmail";
import { useLoginMutation } from "../redux/apis/auth";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const [login, { isLoading }] = useLoginMutation();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setSnackbar({
        open: true,
        message: "Please fill in all fields",
        severity: "error",
      });
      return;
    }

    const { error } = await login(formData);

    if (error) {
      setSnackbar({
        open: true,
        message: error.data.message || "Login failed",
        severity: "error",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Login successful!",
        severity: "success",
      });

      navigate("/instance");
    }
  };

  return (
    <Main>
      <Logo size={250} style={{ marginTop: "24px" }} />

      <StyledSignUp>
        <div className="form-container">
          <h3>Sign In with Email</h3>
          <div className="form-detail">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              disabled={isLoading}
              value={formData.email}
              onChange={handleInputChange}
            />
            <br />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              required
              disabled={isLoading}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <br />
            <button className="btn" onClick={handleSignIn} disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={16} style={{ color: "white" }} />
              ) : (
                "Sign In"
              )}
            </button>
            <h5
              onClick={() => navigate("/forget-password")}
              style={{
                marginLeft: "auto",
                marginTop: "1rem",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Forget Password?
            </h5>
            <br />
            <p>
              I&apos;m a new user{" "}
              <Link to="/signup">
                <span>Signup</span>
              </Link>{" "}
            </p>
            <br />
            <SignInWithoutEmail />
          </div>
        </div>

        <div className="image-container">
          <img src={LoginImg} alt="" />
        </div>
      </StyledSignUp>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
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

  @media (max-width: 768px) {
    width: 90%;
  }
`;

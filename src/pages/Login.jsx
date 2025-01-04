import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/apis/loginSlice";
import { loginAPI } from "../redux/apis/loginSlice";
import LoginImg from "../assets/images/login.jpg";
import Logo from "../assets/images/nav.webp";
import SignInWithoutEmail from "../components/SignInwithoutEmail";
import { setUser } from "../redux/apis/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.login);

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

    try {
      dispatch(loginStart());

      const response = await loginAPI(formData.email, formData.password);

      if (response?.user) {
        dispatch(loginSuccess());
        dispatch(setUser(response.user));

        setSnackbar({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        setTimeout(() => {
          navigate("/instance");
        }, 1500);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      setSnackbar({
        open: true,
        message: error.message || "Login failed",
        severity: "error",
      });
    }
  };

  return (
    <Main>
      <img src={Logo} alt="" />
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
              disabled={loading}
              value={formData.email}
              onChange={handleInputChange}
            />
            <br />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              required
              disabled={loading}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <br />
            <button onClick={handleSignIn} disabled={loading}>
              {loading ? (
                <CircularProgress size={16} style={{ color: "white" }} />
              ) : (
                "Sign In"
              )}
            </button>
            <h5
              onClick={() => navigate("/forget-password")}
              style={{
                marginLeft: "6.5rem",
                marginTop: "1rem",
                cursor: "pointer",
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

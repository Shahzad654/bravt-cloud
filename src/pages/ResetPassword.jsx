import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { resetPasswordThunk } from "../redux/apis/resetSlice";
import { Snackbar, Button } from "@mui/material";

export default function ResetPassword() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const {
    loading,
    success,
    error: resetPasswordError,
  } = useSelector(
    (state) =>
      state.resetPassword || { loading: false, success: false, error: null }
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    dispatch(resetPasswordThunk(userId, password, confirmPassword));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    // if (success) {
    //   navigate('/');
    // }
  };

  useEffect(() => {
    if (resetPasswordError) {
      setSnackbarMessage(resetPasswordError);
      setOpenSnackbar(true);
    }
  }, [resetPasswordError]);

  useEffect(() => {
    if (success) {
      setSnackbarMessage("Password reset successful!");
      setOpenSnackbar(true);
    }
  }, [success]);

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

            {error && <span style={{ color: "red" }}>{error}</span>}

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="btn"
            >
              {loading ? "Resetting..." : "Reset"}
            </button>
          </div>
        </div>
      </StyledSignUp>

      {/* MUI Snackbar for success/error messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
            CLOSE
          </Button>
        }
      />
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

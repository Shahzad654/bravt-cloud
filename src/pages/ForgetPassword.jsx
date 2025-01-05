import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import { forgotPasswordThunk } from "../redux/apis/forgetSlice";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.forgetPassword
  );

  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordThunk(email));
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Main>
      <StyledForm>
        <h3>Forgot Password</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? <CircularProgress size={20} /> : "Send Email"}
          </button>
        </form>
      </StyledForm>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        {success ? (
          <Alert onClose={handleCloseSnackbar} severity="success">
            {success}
          </Alert>
        ) : error ? (
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        ) : null}
      </Snackbar>
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

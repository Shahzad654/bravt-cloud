import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendVerificationCode, verifyAndSignup, setEmailAndPassword } from '../redux/apis/authSlice';
import styled from 'styled-components';
import LoginImg from '../assets/images/signup.jpg';
import Logo from "../assets/images/nav.webp";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, verificationSent } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [isCodeSending, setIsCodeSending] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false); 


  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  }, [error]);


  useEffect(() => {
    if (verificationSent) {
      setSnackbarMessage('Verification code sent successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }
  }, [verificationSent]);

  const handleSendCode = async () => {
    if (!email) {
      setSnackbarMessage('Please enter a valid email.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setIsCodeSending(true);
    try {
      await dispatch(sendVerificationCode(email)).unwrap();
    } catch (err) {
      // Error handling is done through the useEffect
    } finally {
      setIsCodeSending(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !code || !password) {
      setSnackbarMessage('Please fill in all fields.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setIsSigningUp(true);
    try {
      dispatch(setEmailAndPassword({ email, password }));
      await dispatch(verifyAndSignup({ email, code, password })).unwrap();
      setSnackbarMessage('Signup Successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate('/billing-info');
    } catch (err) {
      // Error handling is done through the useEffect
    } finally {
      setIsSigningUp(false);
    }
  };

  
  const isFormValid = email && code && password;
  return (
    <Main>
      <img src={Logo} alt="" />
      <StyledSignUp>
        <div className="form-container">
          <h3>Sign Up with Email</h3>
          <div className="form-detail">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <label htmlFor="code">Email verification code</label>
            <input
              type="text"
              id="code"
              required
              placeholder="Enter your verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleSendCode}
              disabled={isCodeSending || !email}
              style={{ marginTop: '5%', minWidth: '2px', paddingTop: '3px', paddingBottom: '3px' }} >
              {isCodeSending ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send Code'}
            </button>

            <br />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />

            <button
              onClick={handleSignup}
              disabled={!isFormValid || isSigningUp}
              style={{ marginTop: '20px' }} >
              {isSigningUp ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Signup'}
            </button>

            <br />
            <p>
              I have an account{" "}
              <Link to="/">
                <span>Sign In</span>
              </Link>
            </p>
            <br />
          </div>
        </div>

        <div className="image-container">
          <img src={LoginImg} alt="" />
        </div>
      </StyledSignUp>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
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

  @media (min-width: 640px) and (max-width: 1024px) {
    width: 80%;
    margin: auto;
  }
`;

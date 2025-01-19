import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import styled from "styled-components";
import { API_URL } from "../utils/constants";
import { useQueryState } from "nuqs";
import { message } from "antd";
import { useEffect } from "react";

export default function SignInWithoutEmail() {
  const [error, setError] = useQueryState("oauth_error");
  useEffect(() => {
    if (error) {
      message.error(error);
      setError(null);
    }
  }, [error, setError]);

  return (
    <StyledSignIn>
      <div className="line">
        <div />
        <span>Or</span>
        <div />
      </div>
      <button
        onClick={() => window.open(`${API_URL}/api/auth/google`, "_self")}
      >
        <FcGoogle /> Continue with Google
      </button>

      <button
        onClick={() => window.open(`${API_URL}/api/auth/github`, "_self")}
      >
        <FaGithub /> Continue with GitHub
      </button>
    </StyledSignIn>
  );
}

const StyledSignIn = styled.div`
  .line {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    div {
      height: 1px;
      width: 100%;
      background-color: var(--text-light-color);
    }
    span {
      color: var(--text-light-color);
      margin: 0 10px;
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin: 0.6rem 0;
  button {
    background-color: transparent;
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid var(--text-light-color);
    border-radius: 50px;
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

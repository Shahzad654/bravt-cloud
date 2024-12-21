import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
  GithubAuthProvider
} from "firebase/auth";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import styled from "styled-components";


export default function SignInWithoutEmail() {
  const googleProvider = new GoogleAuthProvider();
  // const facebookProvider = new FacebookAuthProvider();

  // const location = useLocation();
  // let { from } = location.state || { from: { pathname: "/dashboard" } };

  // const signInHandler = async (provider) => {
  //   try {
  //     // localStorage.setItem("routePath", from.pathname);
  //     await signInWithRedirect(auth, provider);
  //   } catch (e) {
  //     console.log("error while redirecting", e);
  //   }
  // };

  return (
    <StyledSignIn>
      <div className="line">
        <div />
        <span>Or</span>
        <div />
      </div>
      <button
        // onClick={() => signInHandler(googleProvider)}
        className="google-button google-btn-gtag"
      >
        <FcGoogle /> Continue with Google
      </button>

      <button
        // onClick={() => signInHandler(googleProvider)}
        className="google-button google-btn-gtag"
      >
        <FaGithub /> Continue with GitHub
      </button>
      {/* <button
        onClick={() => signInHandler(facebookProvider)}
        className="google-button google-btn-gtag"
      >
        <FaFacebook color="#3877ea" /> Continue with Facebook
      </button> */}
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

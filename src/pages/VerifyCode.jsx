import { useState } from "react"
import { useCountdown } from "usehooks-ts"
import styled from "styled-components"
import LoginImg from "../assets/images/signup.jpg"
import { useSearchParams } from "react-router-dom"
import CircularProgress from "@mui/material/CircularProgress"
import Logo from "../components/Logo"
import {
  useSendVerificationMutation,
  useVerifyCodeMutation
} from "../redux/apis/auth"
import { message } from "antd"

export default function VerifyCode() {
  const [searchParams] = useSearchParams()
  const [code, setCode] = useState("")
  const email = searchParams.get("email")
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60
  })

  const [verifyCode, { isLoading }] = useVerifyCodeMutation()
  const [resend, { isLoading: isResending, isSuccess }] =
    useSendVerificationMutation()

  if (!email) {
    throw new Error("No email!")
  }

  const handleResendCode = async () => {
    if (isSuccess && count > 0) {
      return
    }

    if (!email) {
      message.error("Please enter a valid email.")
      return
    }

    const invitedBy = searchParams.get("ref")?.trim() ?? null
    const { error } = await resend({ email, invitedBy })
    if (error) {
      message.error(error.data.message)
      return
    }

    message.success("Check your email for verification code")
    resetCountdown()
    startCountdown()
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()

    if (!code || code.length !== 6) {
      message.error("Invalid verification code")
      return
    }

    const { error } = await verifyCode({ email, code })
    if (error) {
      message.error(error.data.message)
      return
    }
  }

  return (
    <Main>
      <Logo size={250} style={{ marginTop: "24px" }} />
      <StyledSignUp>
        <div className="form-container">
          <div>
            <h3>Enter verification code</h3>
            <p
              style={{
                fontSize: "14px",
                color: "gray"
              }}
            >
              We have sent a verification code to{" "}
              <span style={{ color: "black", fontSize: "14px" }}>{email}</span>
            </p>
          </div>
          <form className="form-detail" onSubmit={handleVerifyCode}>
            <label htmlFor="otp">Code</label>
            <input
              type="number"
              id="otp"
              required
              placeholder="Enter otp code"
              value={code}
              min={1}
              onChange={(e) => setCode(e.target.value)}
            />

            <button
              className="btn"
              type="submit"
              disabled={isLoading || code?.length !== 6}
              style={{ marginTop: "20px", height: "36px" }}
            >
              {isLoading ? (
                <CircularProgress size={18} style={{ color: "inherit" }} />
              ) : (
                "Verify"
              )}
            </button>
          </form>

          {isSuccess && count > 0 ? (
            <p
              style={{
                fontSize: "14px",
                color: "gray",
                whiteSpace: "nowrap"
              }}
            >
              Sending code in {count}s
            </p>
          ) : (
            <button
              type="button"
              disabled={isResending}
              onClick={handleResendCode}
              className="resend-code-btn"
            >
              Didn&apos;t receive code?
            </button>
          )}
        </div>

        <div className="image-container">
          <img src={LoginImg} alt="" />
        </div>
      </StyledSignUp>
    </Main>
  )
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
`

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

  .resend-code-btn {
    padding: 0;
    margin: 0;
    border: 0;
    white-space: nowrap;
    outline: none;
    background: transparent;
    font-size: 14px;
    color: var(--primary-color);
    &:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
    &:disabled {
      pointer-events: none;
      opacity: 0.5;
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
`

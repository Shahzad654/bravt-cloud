import { Alert, Button, Typography } from "antd"
import styled from "styled-components"
import { use2FAStore } from "../stores/use-2fa-store"
import { useDispatch } from "react-redux"
import { authUtil } from "../redux/apis/auth"
import { LuDownload } from "react-icons/lu"

const { Title, Paragraph } = Typography

export default function SaveRecoveryCodes() {
  const { recoveryCodes, update } = use2FAStore()
  const dispatch = useDispatch()

  const downloadRecoveryCodes = () => {
    const textContent = recoveryCodes.join("\n")
    const blob = new Blob([textContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "recovery-codes.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Title level={4}>Save your recovery codes</Title>
      <Paragraph>
        Recovery codes can be used to access your account if you lose your phone
        or cannot access your authenticator app. Each code can only be used
        once.
      </Paragraph>

      <RecoveryCodesContainer>
        {recoveryCodes.map((code, index) => (
          <RecoveryCode key={index}>
            <span>{code}</span>
          </RecoveryCode>
        ))}
      </RecoveryCodesContainer>

      <Alert
        message="Important"
        description="Store these recovery codes in a safe place. They won't be shown again!"
        type="warning"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Button onClick={downloadRecoveryCodes} icon={<LuDownload />}>
          Download recovery codes
        </Button>

        <Button
          type="primary"
          onClick={() => {
            update({
              recoveryCodes: [],
              step: 0,
              secret: "",
              qrCodeUrl: ""
            })
            dispatch(
              authUtil.updateQueryData("getSession", undefined, (draft) => {
                Object.assign(draft, { twoFactorEnabled: new Date() })
              })
            )
          }}
        >
          Finish
        </Button>
      </div>
    </>
  )
}

const RecoveryCodesContainer = styled.div`
  margin: 24px 0;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
`

const RecoveryCode = styled.div`
  font-family: monospace;
  padding: 8px;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`

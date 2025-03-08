import { Button, Input, message, Spin, Typography } from "antd"
import { use2FAStore } from "../stores/use-2fa-store"
import { useEnable2FAMutation } from "../redux/apis/auth"

const { Title, Paragraph } = Typography

export default function Verify2FACode() {
  const { code, update } = use2FAStore()
  const [verifyCode, { isLoading }] = useEnable2FAMutation()

  const handleVerify = async () => {
    const { error, data } = await verifyCode({ code })
    if (error) {
      message.error(error.data.message)
      return
    }

    update({ recoveryCodes: data.recoveryCodes, step: 2 })
  }

  return (
    <Spin spinning={isLoading}>
      <Title level={4}>Verify your setup</Title>
      <Paragraph>
        Enter the 6-digit verification code from your authenticator app:
      </Paragraph>

      <div style={{ margin: "24px 0" }}>
        <Input.Search
          placeholder="Enter 6-digit code"
          enterButton="Verify"
          size="large"
          value={code}
          onChange={(e) => update({ code: e.target.value })}
          onSearch={handleVerify}
          maxLength={6}
          loading={isLoading}
        />
      </div>

      <div>
        <Button onClick={() => update({ step: 0 })}>Back</Button>
      </div>
    </Spin>
  )
}

import styled from "styled-components"
import { LuShieldCheck, LuShield } from "react-icons/lu"
import { Button, message, Typography } from "antd"
import { useGenerate2FASecretMutation } from "../redux/apis/auth"
import { use2FAStore } from "../stores/use-2fa-store"

const { Title, Paragraph } = Typography

export default function Init2FA() {
  const [init2Fa, { isLoading }] = useGenerate2FASecretMutation()
  const updateSecret = use2FAStore((s) => s.update)

  const handleInit2Fa = async () => {
    const { error, data } = await init2Fa()

    if (error) {
      message.error(error.data.message)
      return
    }

    console.log({ data })

    updateSecret({
      secret: data.secret,
      qrCodeUrl: data.otpauthUrl,
      step: 0
    })
  }

  return (
    <CenteredContent>
      <IconWrapper style={{ marginBottom: 24 }}>
        <LuShield size={48} />
      </IconWrapper>
      <Title level={4} style={{ marginBottom: 16 }}>
        Add an extra layer of security
      </Title>
      <Paragraph style={{ marginBottom: 24 }}>
        Protect your account with two-factor authentication. You&apos;ll need to
        enter a code from your phone in addition to your password when signing
        in.
      </Paragraph>
      <Button
        type="primary"
        size="large"
        icon={<LuShieldCheck size={16} />}
        onClick={handleInit2Fa}
        loading={isLoading}
      >
        Enable Two-Factor Authentication
      </Button>
    </CenteredContent>
  )
}

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 24px;
`

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
  color: #1677ff;
`

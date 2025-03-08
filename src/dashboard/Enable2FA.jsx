import { Button, Typography } from "antd"
import QRCode from "react-qr-code"
import { use2FAStore } from "../stores/use-2fa-store"
import styled from "styled-components"

const { Title, Paragraph, Text } = Typography

export default function Enable2FA() {
  const { qrCodeUrl, secret, update } = use2FAStore()

  return (
    <>
      <Title level={4}>Set up two-factor authentication</Title>
      <Paragraph>
        1. Install an authenticator app on your mobile device:
        <ul>
          <li>Google Authenticator</li>
          <li>Microsoft Authenticator</li>
          <li>Authy</li>
        </ul>
      </Paragraph>
      <Paragraph>2. Scan this QR code with your authenticator app:</Paragraph>

      <QRCodeContainer>
        <QRCode value={qrCodeUrl} size={200} />
      </QRCodeContainer>

      <Paragraph>
        3. If you can&apos;t scan the QR code, enter this code manually in your
        app:
      </Paragraph>
      <Text code copyable style={{ fontSize: 16 }}>
        {secret}
      </Text>

      <div style={{ marginTop: 24 }}>
        <Button type="primary" onClick={() => update({ step: 1 })}>
          Next
        </Button>
      </div>
    </>
  )
}

const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 8px;
`

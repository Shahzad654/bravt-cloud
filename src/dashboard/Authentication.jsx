import DashHeader from "../components/DashHeader"
import { useGetSessionQuery } from "../redux/apis/auth"
import { LuTriangleAlert, LuShieldCheck } from "react-icons/lu"
import Init2FA from "./Init2FA"
import { Alert, Card, Space, Steps, Tag } from "antd"
import styled from "styled-components"
import { use2FAStore } from "../stores/use-2fa-store"
import Enable2FA from "./Enable2FA"
import Verify2FACode from "./Verify2FACode"
import SaveRecoveryCodes from "./SaveRecoveryCodes"
import Disable2FA from "./Disable2FA"

const Authentication = () => {
  const { data: user } = useGetSessionQuery()
  const { secret, step, recoveryCodes } = use2FAStore()

  if (user.twoFactorEnabled) {
    return <Disable2FA />
  }

  return (
    <>
      <DashHeader />
      <div style={{ padding: "20px" }}>
        <StyledCard
          title={
            <Space align="center">
              <IconWrapper>
                <LuShieldCheck size={20} />
              </IconWrapper>
              Two-Factor Authentication
              <StatusTag color="warning">Disabled</StatusTag>
            </Space>
          }
        >
          <Alert
            message="Enhance your account security"
            description="Two-factor authentication adds an extra layer of security to your account by requiring access to your phone in addition to your password."
            type="warning"
            showIcon
            icon={<LuTriangleAlert size={24} />}
            style={{ marginBottom: 24 }}
          />

          {!secret ? (
            <Init2FA />
          ) : (
            <>
              <Steps current={step} style={{ marginBottom: 24 }}>
                <Steps.Step title="Setup" description="Scan QR code" />
                <Steps.Step title="Verify" description="Enter code" />
                <Steps.Step title="Backup" description="Save recovery codes" />
              </Steps>

              {step === 0 ? (
                <Enable2FA />
              ) : step === 1 ? (
                <Verify2FACode />
              ) : step === 2 && recoveryCodes?.length > 0 ? (
                <SaveRecoveryCodes />
              ) : null}
            </>
          )}
        </StyledCard>
      </div>
    </>
  )
}

export default Authentication

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;

  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
  }
`

const IconWrapper = styled.div`
  color: var(--primary-color);
`

const StatusTag = styled(Tag)`
  margin-left: 8px;
`

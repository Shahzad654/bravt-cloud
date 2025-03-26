import { useNavigate, useParams } from "react-router-dom";
import { useVerify2FALoginMutation } from "../redux/apis/auth";
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Input,
  message,
  notification,
  Space,
  Typography,
} from "antd";
import styled from "styled-components";
import { LuKeyRound, LuShield } from "react-icons/lu";

const { Title, Paragraph } = Typography;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 480px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
  color: #1677ff;
`;

const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background-color: #f5f5f5;
`;

export default function Verify2FALogin() {
  const [code, setCode] = useState("");

  const { tempToken } = useParams();
  const navigate = useNavigate();

  const [verify2FALogin, { isLoading }] = useVerify2FALoginMutation();

  const handleVerify2FALogin = async (e) => {
    e.preventDefault();
    const { error } = await verify2FALogin({ tempToken, code });
    if (error) {
      if (error.status === 410) {
        notification.error({
          message: "Session expired, login again",
          description: "Kindly go back & login again",
          btn: (
            <Button
              type="primary"
              size="small"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          ),
        });
      } else {
        message.error(error.data.message);
      }

      return;
    }

    message.success("Logged in successfully!");
  };

  return (
    <VerificationContainer>
      <StyledCard>
        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%", textAlign: "center" }}
        >
          <div>
            <IconWrapper style={{ marginBottom: 16 }}>
              <LuShield size={48} />
            </IconWrapper>
            <Title level={3} style={{ marginBottom: 8 }}>
              Two-Factor Authentication
            </Title>
            <Paragraph type="secondary">
              Enter the 6-digit code from your authenticator app to continue
            </Paragraph>
          </div>

          <Alert
            message={
              <Space>
                <LuKeyRound size={16} />
                <span>Security Check</span>
              </Space>
            }
            description="This extra step helps keep your account secure by verifying your identity."
            type="info"
            style={{ textAlign: "left" }}
          />

          <form onSubmit={handleVerify2FALogin}>
            <Input
              size="large"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="000000"
              autoFocus
              style={{ marginBottom: 16 }}
            />
            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              loading={isLoading}
              disabled={!code}
            >
              Verify & Continue
            </Button>
          </form>

          <Paragraph
            type="secondary"
            style={{ marginBottom: 0, fontSize: "13px" }}
          >
            Lost access to your authenticator app?
            <br />
            Use one of your recovery codes to sign in
          </Paragraph>
        </Space>
      </StyledCard>
    </VerificationContainer>
  );
}

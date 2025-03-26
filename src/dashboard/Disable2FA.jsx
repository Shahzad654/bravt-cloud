import styled from "styled-components";
import DashHeader from "../components/DashHeader";
import {
  Alert,
  Button,
  Card,
  Divider,
  Input,
  message,
  Modal,
  Space,
  Spin,
  Tag,
  Typography,
} from "antd";
import {
  LuCircleCheck,
  LuLock,
  LuShieldCheck,
  LuSmartphone,
} from "react-icons/lu";
import {
  authUtil,
  useDisable2FAMutation,
  useGetSessionQuery,
} from "../redux/apis/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";

const { Title, Paragraph } = Typography;

export default function Disable2FA() {
  const { data: user } = useGetSessionQuery();
  const [disable2FA, { isLoading }] = useDisable2FAMutation();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDisable2FA = async () => {
    const { error } = await disable2FA({ password });
    if (error) {
      message.error(error.data.message);
      return;
    }

    setIsModalOpen(false);
    dispatch(
      authUtil.updateQueryData("getSession", undefined, (draft) => {
        Object.assign(draft, { twoFactorEnabled: null, twoFactorSecret: null });
      }),
    );
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setPassword("");
  };

  return (
    <>
      <DashHeader />
      <div style={{ padding: "20px" }}>
        <StyledCard
          title={
            <Space>
              <IconWrapper>
                <LuShieldCheck size={20} />
              </IconWrapper>
              Two-Factor Authentication
              <StatusTag color="success">Enabled</StatusTag>
            </Space>
          }
        >
          <Alert
            message="Your account is protected"
            description="Two-factor authentication is currently enabled for your account. This adds an extra layer of security by requiring access to your phone in addition to your password."
            type="success"
            showIcon
            icon={<LuCircleCheck size={24} />}
            style={{ marginBottom: 24 }}
          />

          <Divider />

          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Title
                level={5}
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "8px",
                }}
              >
                <IconWrapper>
                  <LuSmartphone size={16} />
                </IconWrapper>
                Authentication App
              </Title>
              <Paragraph>
                You&apos;re currently using an authentication app to generate
                two-factor codes.
              </Paragraph>
            </div>

            <Button
              danger
              type="primary"
              onClick={() => setIsModalOpen(true)}
              icon={<LuLock size={16} />}
            >
              Disable Two-Factor Authentication
            </Button>
          </Space>
        </StyledCard>
      </div>

      <Modal
        title="Disable Two-Factor Authentication"
        open={isModalOpen}
        footer={null}
        onCancel={handleClose}
      >
        <Spin spinning={isLoading}>
          <Alert
            message="Warning"
            description="Disabling two-factor authentication will make your account less secure. Are you sure you want to continue?"
            type="warning"
            showIcon
            style={{ marginBottom: 24 }}
          />

          {user.hasPassword && (
            <div style={{ marginBottom: 24 }}>
              <Input.Password
                placeholder="Enter your password to confirm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          <Space>
            <Button
              danger
              type="primary"
              onClick={handleDisable2FA}
              disabled={user.hasPassword && !password}
            >
              Disable 2FA
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Space>
        </Spin>
      </Modal>
    </>
  );
}

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 12px;

  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const IconWrapper = styled.div`
  color: var(--primary-color);
`;

const StatusTag = styled(Tag)`
  margin-left: 8px;
`;

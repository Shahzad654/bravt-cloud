import styled from "styled-components";
import { Card, Typography, Button, Input, message, Skeleton } from "antd";
import { LuDollarSign, LuCopy } from "react-icons/lu";
import { useGetSessionQuery } from "../../redux/apis/auth";
import { useGetCommissionQuery } from "../../redux/apis/affiliate";

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  .ant-card-body {
    padding: 24px;
  }
`;

const CommissionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 16px;
`;

export default function AffiliateInput() {
  const { data: user } = useGetSessionQuery();
  const { data: commission, isLoading } = useGetCommissionQuery();
  const affiliateLink = `${window.location.origin}/signup?ref=${user?.id}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    message.success("Affiliate link copied to clipboard!");
  };

  return (
    <StyledCard style={{ marginBottom: "2rem" }}>
      <Title level={4}>Your Affiliate Link</Title>

      <Input.Group compact>
        <Input
          style={{ width: "calc(100% - 100px)" }}
          value={affiliateLink}
          readOnly
        />
        <Button
          type="primary"
          style={{ height: "38px" }}
          icon={<LuCopy size={16} />}
          onClick={copyToClipboard}
        >
          Copy
        </Button>
      </Input.Group>

      <CommissionInfo>
        <Skeleton loading={isLoading} paragraph={{ rows: 0 }}>
          <LuDollarSign style={{ fontSize: "24px", color: "#52c41a" }} />
          <Text>
            Earn{" "}
            <Text strong style={{ color: "var(--primary-color)" }}>
              {commission?.commission ?? 0}% commission
            </Text>{" "}
            on the first transaction of each referral!
          </Text>
        </Skeleton>
      </CommissionInfo>
    </StyledCard>
  );
}

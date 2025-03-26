import styled from "styled-components";
import { useGetAffiliateStatsQuery } from "../../redux/apis/affiliate";
import { Card, Typography } from "antd";
import { LuUsers, LuDollarSign, LuUserCheck } from "react-icons/lu";
import { formatPrice } from "../../utils/helpers";
const { Title, Text } = Typography;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export default function AffiliateStats() {
  const { isLoading, data } = useGetAffiliateStatsQuery();

  return (
    <StatsContainer>
      <StyledCard>
        <IconWrapper style={{ background: "#4CAF5015" }}>
          <LuDollarSign size={24} color="#4CAF50" />
        </IconWrapper>

        {isLoading ? (
          <div
            style={{
              width: "80px",
              height: "32px",
              backgroundColor: "#f4f4f5",
              borderRadius: "5px",
            }}
          />
        ) : (
          <Title level={3} style={{ margin: "0" }}>
            {formatPrice(data?.totalCommission, 3)}
          </Title>
        )}
        <Text type="secondary">Total Commission</Text>
      </StyledCard>
      <StyledCard>
        <IconWrapper style={{ background: "#2196F315" }}>
          <LuUsers size={24} color="#2196F3" />
        </IconWrapper>
        {isLoading ? (
          <div
            style={{
              width: "80px",
              height: "32px",
              backgroundColor: "#f4f4f5",
              borderRadius: "5px",
            }}
          />
        ) : (
          <Title level={3} style={{ margin: "0" }}>
            {formatPrice(data?.totalAffiliated, 0, "decimal")}
          </Title>
        )}
        <Text type="secondary">Total Referrals</Text>
      </StyledCard>
      <StyledCard>
        <IconWrapper style={{ background: "#9C27B015" }}>
          <LuUserCheck size={24} color="#9C27B0" />
        </IconWrapper>
        {isLoading ? (
          <div
            style={{
              width: "80px",
              height: "32px",
              backgroundColor: "#f4f4f5",
              borderRadius: "5px",
            }}
          />
        ) : (
          <Title level={3} style={{ margin: "0" }}>
            {formatPrice(data?.totalActiveReferrals, 0, "decimal")}
          </Title>
        )}
        <Text type="secondary">Successful Referrals</Text>
      </StyledCard>
    </StatsContainer>
  );
}

const StyledCard = styled(Card)`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  .ant-card-body {
    padding: 24px;
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

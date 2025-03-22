import styled from "styled-components"
// import { useGetAffiliateStatsQuery } from "../../redux/apis/affiliate"
import { Card, Typography } from 'antd';
import { cloneElement } from "react";
import { LuUsers, LuDollarSign, LuUserCheck, } from 'react-icons/lu';
const { Title, Text } = Typography;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

export default function AffiliateStats() {
  // const { isLoading, data } = useGetAffiliateStatsQuery()
  const statsData = [
    {
      title: 'Total Commission',
      value: '$1,234.56',
      icon: <LuDollarSign size={24} />,
      color: '#4CAF50'
    },
    {
      title: 'Users Referred',
      value: '45',
      icon: <LuUsers size={24} />,
      color: '#2196F3'
    },
    {
      title: 'Successful Transactions',
      value: '23',
      icon: <LuUserCheck size={24} />,
      color: '#9C27B0'
    }
  ];

  return <StatsContainer>
  {statsData?.map((stat, index) => (
    <StyledCard key={index}>
      <IconWrapper style={{ background: `${stat.color}15` }}>
        {cloneElement(stat.icon, { color: stat.color })}
      </IconWrapper>
      <Title level={3} style={{ margin: '0' }}>{stat.value}</Title>
      <Text type="secondary">{stat.title}</Text>
    </StyledCard>
  ))}
</StatsContainer>
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
import { Card, Table, Typography } from 'antd';
import styled from 'styled-components';
const { Title,Text } = Typography;
export default function AffliateTable() {
    const referralData = [
        {
          key: '1',
          user: 'John Doe',
          date: '2024-02-20',
          status: 'Completed',
          commission: '$45.00'
        },
        {
          key: '2',
          user: 'Jane Smith',
          date: '2024-02-19',
          status: 'Pending',
          commission: '$30.00'
        }
      ];
    
      const columns = [
        {
          title: 'User',
          dataIndex: 'user',
          key: 'user',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
          render: (status) => (
            <Text style={{ color: status === 'Completed' ? '#4CAF50' : '#FFA000' }}>
              {status}
            </Text>
          ),
        },
        {
          title: 'Commission',
          dataIndex: 'commission',
          key: 'commission',
        },
      ];
  return (
    <StyledCard>
<Title level={4}>Recent Referrals</Title>
<Table 
  columns={columns} 
  dataSource={referralData}
  pagination={{ pageSize: 5 }}
/>
</StyledCard>
  )
}
const StyledCard = styled(Card)`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  
  .ant-card-body {
    padding: 24px;
  }
`;

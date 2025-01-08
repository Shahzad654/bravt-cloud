import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";

import DashHeader from "../components/DashHeader";
import { Tabs } from "antd";
import MakePayment from "./MakePayment";
import BalanceRecord from "./BalanceRecord";

const { Content } = Layout;

const items = [
  {
    key: "1",
    label: "Make Payment",
    children: <MakePayment />,
  },
  {
    key: "2",
    label: "Balance Record",
    children: <BalanceRecord />,
  },
];

const Payment = () => {
  return (
    <LayoutWrapper>
      <Layout style={{ backgroundColor: "white" }}>
        <DashHeader />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{
              margin: "16px 0",
              fontSize: "var(--m-heading)",
              color: "black",
              fontWeight: "500",
            }}
          >
            Payment
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: "#f0f2f5",
              background: "white",
              borderRadius: "8px",
            }}
          >
            <PageContent>
              <Tabs defaultActiveKey="1" items={items} />
            </PageContent>
          </div>
        </Content>
      </Layout>
    </LayoutWrapper>
  );
};

export default Payment;

const LayoutWrapper = styled(Layout)`
  min-height: 100vh;

  .alerting {
    .alerting_img {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 1rem;

      p {
        text-align: center;
      }

      img {
        width: 160px;
        height: auto;
      }
    }
  }
  p {
    width: 80ch;
    line-height: 2rem;
    font-weight: 500;
    color: var(--text-color);
  }

  @media (max-width: 768px) {
    min-height: 60vh;
  }
`;

const PageContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 20px;

  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .add-btn {
    min-width: 80px;
    padding: 6px 16px;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

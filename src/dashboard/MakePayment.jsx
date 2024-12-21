import React, { useState } from "react";
import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { Table } from "antd";
import { Segmented } from "antd";

const { Content } = Layout;



const MakePayment = () => {
    const [value, setValue] = useState("Map");
  return (
    <LayoutWrapper>
      <Layout style={{ padding: "0 16px", backgroundColor: "white" }}>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{
              margin: "16px 0",
              fontSize: "var(--m-heading)",
              color: "black",
              fontWeight: "500",
            }}
          >
        
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
              <CustomSegmented
                options={["$10", "$25", "$50", "$100", "$200"]}
                value={value}
                onChange={setValue}
              />
              <button>To Pay</button>
            </PageContent>
          </div>
        </Content>
      </Layout>
    </LayoutWrapper>
  );
};

export default MakePayment;

const CustomSegmented = styled(Segmented)`
  .ant-segmented {
    height: 60px; 
    line-height: 60px; 
    font-size: 18px; 
  }

  .ant-segmented-item {
    padding: 0 30px; 
  }

  .ant-segmented-item-selected {
    background-color: var(--primary-color) !important; 
    color: white !important;
  }
`;

const LayoutWrapper = styled(Layout)`
  min-height: 100vh;

  @media (max-width: 768px) {
    min-height: 60vh;
  }
`;

const PageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
 

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

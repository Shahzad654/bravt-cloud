import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import InstancesTable from "./InstancesTable";

const { Content } = Layout;

const Instance = () => {
  const navigate = useNavigate();

  return (
    <LayoutWrapper>
      <DashSidebar />

      <Layout style={{ padding: "0 16px", backgroundColor: "white" }}>
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
            Instance
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "white",
              borderRadius: "8px",
            }}
          >
            <PageContent>
              <div className="search">
                <input type="text" placeholder="Please enter" />
                <select name="" id="">
                  <option value="">Server Name</option>
                  <option value="">Server ID</option>
                  <option value="">IP Address</option>
                </select>
              </div>

              <button
                className="btn add-btn"
                onClick={() => {
                  navigate("/deploy");
                }}
              >
                +Add
              </button>
            </PageContent>
            <InstancesTable />
          </div>
        </Content>
      </Layout>
    </LayoutWrapper>
  );
};

export default Instance;

const LayoutWrapper = styled(Layout)`
  min-height: 100vh;

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

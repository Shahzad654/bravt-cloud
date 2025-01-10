import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import InstancesTable from "./InstancesTable";

const { Content } = Layout;

const Instance = () => {
  const navigate = useNavigate();

  return (
    <LayoutWrapper>
      <Layout style={{ backgroundColor: "white" }}>
        <Content>
          <DashHeader />

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "white",
              borderRadius: "8px",
            }}
          >
            <PageContent>
              <Breadcrumb
                style={{
                  fontSize: "var(--m-heading)",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                Instances
              </Breadcrumb>

              <button
                className="btn add-btn"
                onClick={() => navigate("/instance/deploy")}
              >
                <LuPlus size={16} /> Add
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
    display: flex;
    align-items: center;
    gap: 6px;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

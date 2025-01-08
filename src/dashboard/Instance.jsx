import styled from "styled-components";
import { Breadcrumb, Layout, Spin } from "antd";
import DashHeader from "../components/DashHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearInstances, fetchAllInstances } from "../redux/apis/getAllInstanceSlice";
import { Content } from "antd/es/layout/layout";
import { LuPlus } from "react-icons/lu";
import InstancesTable from "./InstancesTable";

const Instance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { instances, instancesStatus, error } = useSelector((state) => {
    return state.allInstance});

  useEffect(() => {
    dispatch(fetchAllInstances());
  }, [dispatch]);

  if (instancesStatus === "loading") return <Spin tip="Loading instances..." />;
  if (instancesStatus === "error") return <p>Error: {error}</p>;

  console.log("instances",instances);
  const formattedData = instances.map((instance, index) => ({
    key: index,
    server: instance.hostname, // Adjust according to API response
    location: instance.region, // Adjust according to API response
    ipaddress: instance.main_ip, // Adjust according to API response
    status: instance.status || "inactive", // Adjust according to API response
  }));

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
                onClick={() => navigate("/deploy")}
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

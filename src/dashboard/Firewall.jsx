import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";

import DashHeader from "../components/DashHeader";
import { Table } from "antd";
import CreateFirewallModal from "./CreateFirewallModal";
import { useGetFirewallGroupsQuery } from "../redux/apis/firewalls";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";

const { Content } = Layout;

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Description",
    dataIndex: "description",
    sorter: (a, b) => a.description.localeCompare(b.description),
    showSorterTooltip: {
      target: "full-header",
    },
  },
  {
    title: "Date Created",
    dataIndex: "date_created",
    render: formatDate,
    sorter: (a, b) => new Date(a.date_created) - new Date(b.date_created),
    showSorterTooltip: {
      target: "full-header",
    },
  },
  {
    title: "Rules",
    dataIndex: "rule_count",
    sorter: (a, b) => a.rule_count - b.rule_count,
    showSorterTooltip: {
      target: "full-header",
    },
  },
  {
    title: "Instances",
    dataIndex: "instance_count",
    sorter: (a, b) => a.instance_count - b.instance_count,
    showSorterTooltip: {
      target: "full-header",
    },
  },
];

const Firewall = () => {
  const { data, isLoading } = useGetFirewallGroupsQuery();

  const navigate = useNavigate();

  return (
    <LayoutWrapper>
      <Layout style={{ backgroundColor: "white" }}>
        <DashHeader />
        <Content style={{ margin: "0 16px" }}>
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
                Firewall Group
              </Breadcrumb>

              <CreateFirewallModal />
            </PageContent>

            <StyledTable
              columns={columns}
              dataSource={data}
              loading={isLoading}
              rowClassName="cursor-pointer"
              onRow={(record) => ({
                onClick: () => navigate(`/firewall/${record.id}`),
              })}
              showSorterTooltip={{
                target: "sorter-icon",
              }}
              style={{ marginTop: "25px" }}
            />
          </div>
        </Content>
      </Layout>
    </LayoutWrapper>
  );
};

export default Firewall;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--bg-color);
  }

  // Make table responsive for smaller screens
  @media (max-width: 767px) {
    .ant-table-wrapper {
      overflow-x: auto;
    }
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
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

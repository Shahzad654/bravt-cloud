import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { Table } from "antd";
import AlertImg from "../assets/images/alerting.png";

const { Content } = Layout;

const columns = [
  {
    title: "Rule Name",
    dataIndex: "rule",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Status",
    dataIndex: "status",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Date Created",
    dataIndex: "date",
  },
  {
    title: "Operation",
    dataIndex: "operation",
  },
];

const data = [
  {
    key: "1",
    rule: "Rule 1",
    status: "deactive",
    date: "20-8-25",
    operation: "Success",
  },
  {
    key: "2",
    rule: "Rule 1",
    status: "deactive",
    date: "20-8-25",
    operation: "Success",
  },
  {
    key: "3",
    rule: "Rule 1",
    status: "deactive",
    date: "20-8-25",
    operation: "Success",
  },
  {
    key: "4",
    rule: "Rule 1",
    status: "deactive",
    date: "20-8-25",
    operation: "Success",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Monitoring = () => {
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
            Monitoring
          </Breadcrumb>
          <div className="alerting">
            <h4>Alerting</h4>
            <div className="alerting_img">
              <img src={AlertImg} alt="" />
              <p>
                No rules have been created yet, let&apos;s get started right
                away
              </p>
            </div>
          </div>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: "#f0f2f5",
              background: "white",
              borderRadius: "8px",
            }}
          >
            <h4>Alert Rules</h4>
            <PageContent>
              <div className="search">
                <input type="text" placeholder="Please enter" />
                <select name="" id="">
                  <option value="">Rule Name</option>
                </select>
              </div>
              <button className="btn add-btn">+Add</button>
            </PageContent>

            <StyledTable
              columns={columns}
              dataSource={data}
              onChange={onChange}
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

export default Monitoring;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--bg-color);
  }

  @media (max-width: 767px) {
    .ant-table-wrapper {
      overflow-x: auto;
    }
  }
`;

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
        width: 250px;
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
    .alerting {
      .alerting_img {
        padding-left: 200px;
      }
    }
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

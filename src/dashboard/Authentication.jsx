import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { Table } from "antd";

const { Content } = Layout;

const columns = [
  {
    title: "Authentication mode",
    dataIndex: "mode",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Description",
    dataIndex: "description",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Create time",
    dataIndex: "time",
  },
  {
    title: "Operation",
    dataIndex: "operation",
  },
];

const data = [
  //   {
  //     key: "1",
  //     rule: "Rule 1",
  //     status: "deactive",
  //     date: "20-8-25",
  //     operation: "Success",
  //   },
  //   {
  //     key: "2",
  //     rule: "Rule 1",
  //     status: "deactive",
  //     date: "20-8-25",
  //     operation: "Success",
  //   },
  //   {
  //     key: "3",
  //     rule: "Rule 1",
  //     status: "deactive",
  //     date: "20-8-25",
  //     operation: "Success",
  //   },
  //   {
  //     key: "4",
  //     rule: "Rule 1",
  //     status: "deactive",
  //     date: "20-8-25",
  //     operation: "Success",
  //   },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Authentication = () => {
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
            Two Factor Authentication
          </Breadcrumb>
          <div className="alerting">
            <h4>Configure Authentication</h4>
            <div className="auth">
              <select name="" id="">
                <option value="Google Auth">Google Auth</option>
              </select>
              <input type="text" placeholder="Description" />
              <button className="add-btn">Add 2FA</button>
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

export default Authentication;

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
    .auth {
      margin-top: 35px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 1rem;
      .add-btn {
        min-width: 80px;
        padding: 6px 16px;
      }
    }
  }
`;

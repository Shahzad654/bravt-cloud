import React, { useState } from "react";
import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { Table } from "antd";
import { Card, Col, Row, Statistic, Checkbox } from "antd";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const { Content } = Layout;

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Billing Amount",
    dataIndex: "amount",
    showSorterTooltip: {
      target: "full-header",
    },
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

const Billing = () => {
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
            Billing
          </Breadcrumb>
          <div className="alerting">
            <div className="alerting_img">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Card
                    bordered={false}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#1677ff",
                    }}
                  >
                    <Statistic
                      title={
                        <span style={{ fontSize: "1.4rem", color: "white" }}>
                          Accumulated expenses
                        </span>
                      }
                      value={0}
                      precision={2}
                      formatter={(value) => `$ ${value.toFixed(2)}`}
                      valueStyle={{
                        fontSize: "1rem",
                        color: "white",
                      }}
                    />
                  </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Card
                    bordered={false}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#ff8f1f",
                    }}
                  >
                    <Statistic
                      title={
                        <span style={{ fontSize: "1.4rem", color: "white" }}>
                          Charges This Month
                        </span>
                      }
                      value={0}
                      precision={2}
                      formatter={(value) => `$ ${value.toFixed(2)}`}
                      valueStyle={{
                        fontSize: "1rem",
                        color: "white",
                      }}
                    />
                  </Card>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Card
                    bordered={false}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgb(255, 204, 0)",
                    }}
                  >
                    <Statistic
                      title={
                        <span style={{ fontSize: "1.4rem", color: "white" }}>
                          Charges Last Hour
                        </span>
                      }
                      value={0}
                      precision={2}
                      formatter={(value) => `$ ${value.toFixed(2)}`}
                      valueStyle={{
                        fontSize: "1rem",
                        color: "white",
                      }}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
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
                <Space direction="vertical" size={12}>
                  <RangePicker />
                </Space>
                <Checkbox>Hide no-consumption bills</Checkbox>
              </div>
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

export default Billing;



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

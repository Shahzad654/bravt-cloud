import React, { useState } from "react";
import styled from "styled-components";
import { Breadcrumb, Layout, theme } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Table } from "antd";
import FAQ from "../components/FAQ";

const { Content } = Layout;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "var(--l-radius)",
  boxShadow: 24,
  p: 4,
};

const columns = [
  {
    title: "Tciket ID",
    dataIndex: "ticket",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Subject",
    dataIndex: "subject",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Ticket Type",
    dataIndex: "type",
  },

  {
    title: "Submission Time",
    dataIndex: "time",
  },

  {
    title: "Status",
    dataIndex: "status",
  },

  {
    title: "Operation",
    dataIndex: "operation",
  },
];

const data = [
  {
    key: "1",
    ticket: "Ticket 1",
    subject: "Subject 1",
    type: "Type 1",
    status: "active",
    time: "17:12:08",
    operation: "Sccuess",
  },
  {
    key: "2",
    ticket: "Ticket 1",
    subject: "Subject 1",
    type: "Type 1",
    status: "active",
    time: "17:12:08",
    operation: "Sccuess",
  },
  {
    key: "3",
    ticket: "Ticket 1",
    subject: "Subject 1",
    type: "Type 1",
    status: "active",
    time: "17:12:08",
    operation: "Sccuess",
  },
  {
    key: "4",
    ticket: "Ticket 1",
    subject: "Subject 1",
    type: "Type 1",
    status: "active",
    time: "17:12:08",
    operation: "Sccuess",
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Ticket = () => {

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
            Ticket
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
              <div className="search">
                <input type="text" placeholder="Please enter" />
                <select name="" id="">
                  <option value="">Subject</option>
                  <option value="">Ticket ID</option>
                </select>
              </div>

              <button className="add-btn">+Add</button>
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

          <div className="faq">
            <h4 style={{marginBottom:'2rem'}}>Frequently Asked Questions</h4>
            <FAQ />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Ticket;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: var(--bg-color);
  }
`;

const PageContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

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
`;

import React from "react";
import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Table } from "antd";

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
    title: "Block Storage",
    dataIndex: "storage",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Size",
    dataIndex: "size",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Instance",
    dataIndex: "instance",
  },
  {
    title: "location",
    dataIndex: "location",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },

  {
    title: "Datetime",
    dataIndex: "datetime",
  },

  {
    title: "Operation",
    dataIndex: "operation",
  },
];

const data = [
  {
    key: "1",
    storage: "Storage 1",
    size: "3GB",
    instance: "Instance 1",
    location: "New York",
    datetime: "17-8-2024",
    operation: "Sccuess",
  },
  {
    key: "2",
    storage: "Storage 2",
    size: "3GB",
    instance: "Instance 2",
    location: "New York",
    datetime: "17-8-2024",
    operation: "Sccuess",
  },
  {
    key: "3",
    storage: "Storage 3",
    size: "3GB",
    instance: "Instance 3",
    location: "New York",
    datetime: "17-8-2024",
    operation: "Sccuess",
  },
  {
    key: "4",
    storage: "Storage 4",
    size: "3GB",
    instance: "Instance 4",
    location: "New York",
    datetime: "17-8-2024",
    operation: "Sccuess",
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Storage = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

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
            Block Storage
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
                  <option value="">Block Storage ID</option>
                  <option value="">Block Storage Name</option>
                  <option value="">Instance ID</option>
                </select>
              </div>

              <button className="add-btn" onClick={handleOpen}>
                +Add
              </button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>
                    <Typography
                      id="transition-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Tips
                    </Typography>
                    <Typography
                      id="transition-modal-description"
                      sx={{ mt: 2 }}
                    >
                      Hello,creating a disk requires you to recharge your
                      account first! You will receive $1 after recharging
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "16px",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: "#0f7aff",
                          borderRadius: "8px",
                        }}
                      >
                        Recharge
                      </button>
                    </div>
                  </Box>
                </Fade>
              </Modal>
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
    </Layout>
  );
};

export default Storage;

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

import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";

import DashHeader from "../components/DashHeader";
import { Table } from "antd";

const { Content } = Layout;

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    showSorterTooltip: {
      target: "full-header",
    },
  },

  {
    title: "Location",
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
    title: "OS",
    dataIndex: "os",
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
    title: "Datetime",
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
    image: "Image 1",
    location: "New York",
    os: "Windows",
    date: "20-8-25",
    description: "Description",
    operation: "Success",
  },
  {
    key: "2",
    image: "Image 1",
    location: "New York",
    os: "Windows",
    date: "20-8-25",
    description: "Description",
    operation: "Success",
  },
  {
    key: "3",
    image: "Image 1",
    location: "New York",
    os: "Windows",
    date: "20-8-25",
    description: "Description",
    operation: "Success",
  },
  {
    key: "4",
    image: "Image 1",
    location: "New York",
    os: "Windows",
    date: "20-8-25",
    description: "Description",
    operation: "Success",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Images = () => {
  return (
    <LayoutWrapper>
      <Layout style={{ backgroundColor: "white" }}>
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
            Images
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
                  <option value="">Image Name</option>
                  <option value="">Image ID</option>
                </select>
              </div>
            </PageContent>
            <p>
              The Custom Image is generated for data at the system disk only,
              while not data at the data disk. Deleting the custom image will
              not affect the existing VPS. Custom Images are only kept locked
              for 360 hours and cannot be retrieved after deletion.
            </p>
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

export default Images;

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

  p {
    width: 80ch;
    line-height: 2rem;
    font-weight: 500;
    color: var(--text-color);
  }

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

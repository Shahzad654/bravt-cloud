import styled from "styled-components";
import { App, Breadcrumb, Button, Layout, message, Tag } from "antd";
import { TbPlus, TbTrash } from "react-icons/tb";

import DashHeader from "../components/DashHeader";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { formatDate, toSentenceCase } from "../utils/helpers";
import {
  useDeleteSnapshotMutation,
  useGetSnapshotsQuery,
} from "../redux/apis/snapshots";
import { useEffect, useMemo, useRef, useState } from "react";

const { Content } = Layout;

const Snapshot = () => {
  const { modal } = App.useApp();

  const previousDataRef = useRef();
  const [pollingInterval, setPollingInterval] = useState(0);

  const { data, isLoading } = useGetSnapshotsQuery(undefined, {
    pollingInterval,
    selectFromResult: ({ data, isLoading, ...rest }) => ({
      data: data ?? previousDataRef.current,
      isLoading: previousDataRef.current ? false : isLoading,
      ...rest,
    }),
  });

  const isAnySnapshotPending = useMemo(() => {
    return data?.some((snapshot) => snapshot.status === "pending");
  }, [data]);

  useEffect(() => {
    if (data) {
      previousDataRef.current = data;
    }
  }, [data]);

  useEffect(() => {
    if (isAnySnapshotPending) {
      setPollingInterval(5000);
    } else {
      setPollingInterval(0);
    }
  }, [isAnySnapshotPending]);

  const [deleteSnapshot] = useDeleteSnapshotMutation();

  const columns = [
    {
      title: "Label",
      dataIndex: "description",
      sorter: (a, b) => a.description?.localeCompare(b.description),
      showSorterTooltip: {
        target: "full-header",
      },
    },
    {
      title: "Size",
      dataIndex: "compressed_size",
      render: (val) => `${(val / 1024 / 1024 / 1024).toFixed(2)} GB`,
      showSorterTooltip: {
        target: "full-header",
      },
    },
    {
      title: "Date",
      dataIndex: "date_created",
      render: formatDate,
    },
    {
      title: "Charges",
      key: "creditsConsumed",
      render: () => `${process.env.REACT_APP_SNAPSHOT_COST}/GB`,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (val) => (
        <Tag
          color={
            val === "pending" ? "blue" : val === "complete" ? "green" : "red"
          }
        >
          {toSentenceCase(val)}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <DelButton
          aria-label="Delete snapshot"
          onClick={() => {
            modal.error({
              title: "Are you absolutely sure?",
              content: `Snapshot "${record.description || ""}"  will be deleted permanently. This action can't be undone!`,
              okText: "Delete",
              okCancel: true,
              okButtonProps: { color: "danger" },
              onOk: async () => {
                const { error } = await deleteSnapshot(record.id);
                if (error) {
                  message.error(
                    error.data.message || "Failed to delete snapshot"
                  );
                } else {
                  message.success("Snapshot Deleted!");
                }
              },
            });
          }}
        >
          <TbTrash size={18} />
        </DelButton>
      ),
    },
  ];

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
                Snapshots
              </Breadcrumb>

              <Link to="/snapshot/create">
                <Button icon={<TbPlus size={18} />} type="primary">
                  Create snapshot
                </Button>
              </Link>
            </PageContent>
            <StyledTable
              columns={columns}
              dataSource={data}
              loading={isLoading}
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

export default Snapshot;

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

const DelButton = styled.button`
  color: black;
  background: transparent;
  border: 0;
  outline: none;
  padding: 0 20px;

  &:hover {
    color: red;
  }
`;

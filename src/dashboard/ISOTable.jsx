import { message, Modal, Table, Tag } from "antd";
import { useDeleteISOMutation, useListISOsQuery } from "../redux/apis/iso";
import { formatDate, toSentenceCase } from "../utils/helpers";
import { TbTrash } from "react-icons/tb";
import styled from "styled-components";
import { useEffect, useMemo, useRef, useState } from "react";

const ISOTable = () => {
  const [deleteISO] = useDeleteISOMutation();

  const previousDataRef = useRef();
  const [pollingInterval, setPollingInterval] = useState(0);
  const { data, isLoading } = useListISOsQuery(undefined, {
    pollingInterval,
    selectFromResult: ({ data, isLoading, ...rest }) => ({
      data: data ?? previousDataRef.current,
      isLoading: previousDataRef.current ? false : isLoading,
      ...rest,
    }),
  });

  const isAnyISOPending = useMemo(() => {
    return data?.some((iso) => iso.status === "pending");
  }, [data]);

  useEffect(() => {
    if (data) {
      previousDataRef.current = data;
    }
  }, [data]);

  useEffect(() => {
    if (isAnyISOPending) {
      setPollingInterval(5000);
    } else {
      setPollingInterval(0);
    }
  }, [isAnyISOPending]);

  const columns = [
    {
      title: "Name",
      dataIndex: "filename",
      sorter: (a, b) => a.filename?.localeCompare(b.filename),
      showSorterTooltip: {
        target: "full-header",
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      render: (val) => `${(val / 1024 / 1024 / 1024).toFixed(2)} GB`,
      showSorterTooltip: {
        target: "full-header",
      },
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
      title: "Date",
      dataIndex: "date_created",
      render: formatDate,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <DelButton
          aria-label="Delete iso"
          onClick={() => {
            Modal.error({
              title: "Are you absolutely sure?",
              content: `ISO "${record.filename || ""}"  will be deleted permanently. This action can't be undone!`,
              okText: "Delete",
              okCancel: true,
              okButtonProps: { color: "danger" },
              onOk: async () => {
                const { error } = await deleteISO(record.id);
                if (error) {
                  message.error(error.data.message || "Failed to delete iso");
                } else {
                  message.success("ISO Deleted!");
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
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
      style={{ marginTop: "25px" }}
    />
  );
};

export default ISOTable;

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

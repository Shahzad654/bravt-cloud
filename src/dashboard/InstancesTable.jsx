import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getInstances } from "../redux/apis/instancesSlice";
import { useSelector } from "react-redux";
import { Spin, Button, Dropdown, Table, Tag } from "antd";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { MdInstallDesktop } from "react-icons/md";
import { BsDatabaseCheck, BsDatabaseSlash } from "react-icons/bs";
import { TbServerBolt, TbServerCog, TbTrash } from "react-icons/tb";
import styled from "styled-components";
import { toSentenceCase } from "../utils/helpers";

const InstancesTable = () => {
  const dispatch = useDispatch();
  const { instances, status } = useSelector((state) => state.instances);

  const columns = useInstancesTableColumns();

  useEffect(() => {
    dispatch(getInstances());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <StyledTable
      columns={columns}
      dataSource={instances}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
      style={{ marginTop: "25px" }}
    />
  );
};

export default InstancesTable;

function useInstancesTableColumns() {
  const columns = [
    {
      title: "Name",
      dataIndex: "label",
      showSorterTooltip: {
        target: "full-header",
      },
      render: (val) => (
        <>
          {val || (
            <span
              style={{ fontStyle: "italic", color: "gray", fontSize: "14px" }}
            >
              Unlabeled instance
            </span>
          )}
        </>
      ),
      sorter: (a, b) => a.server - b.server,
    },
    {
      title: "Region",
      dataIndex: "region",
      showSorterTooltip: {
        target: "full-header",
      },
      sorter: (a, b) => a.region - b.region,
    },
    {
      title: "IP Address",
      dataIndex: "main_ip",
    },
    {
      title: "Status",
      dataIndex: "power_status",
      render: (status) => (
        <Tag color={status === "running" ? "success" : "error"}>
          {toSentenceCase(status.toLowerCase())}
        </Tag>
      ),
      filters: [
        {
          text: "Active",
          value: "running",
        },
        {
          text: "Stopped",
          //   TODO:
          value: "stopped",
        },
      ],
      onFilter: (value, record) => record.power_status.indexOf(value) === 0,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "details",
                label: (
                  <>
                    <TbServerCog size={16} style={{ marginRight: "8px" }} />
                    Server Details
                  </>
                ),
              },
              {
                key: record.power_status === "running" ? "stop" : "start",
                label: (
                  <>
                    {record.power_status === "running" ? (
                      <BsDatabaseSlash
                        size={16}
                        style={{ marginRight: "8px" }}
                      />
                    ) : (
                      <BsDatabaseCheck
                        size={16}
                        style={{ marginRight: "8px" }}
                      />
                    )}
                    {record.power_status === "running"
                      ? "Stop Server"
                      : "Start Server"}
                  </>
                ),
              },
              {
                key: "restart",
                label: (
                  <>
                    <TbServerBolt size={16} style={{ marginRight: "8px" }} />
                    Restart Server
                  </>
                ),
              },
              {
                key: "reinstall",
                label: (
                  <>
                    <MdInstallDesktop
                      size={16}
                      style={{ marginRight: "8px" }}
                    />
                    Reinstall Server
                  </>
                ),
              },
              {
                type: "divider",
              },
              {
                key: "destroy",
                danger: true,
                label: (
                  <>
                    <TbTrash size={16} style={{ marginRight: "8px" }} />
                    Destroy Server
                  </>
                ),
              },
            ],
          }}
        >
          <Button
            type="text"
            aria-label="Server actions"
            icon={<HiEllipsisHorizontal size={16} />}
          />
        </Dropdown>
      ),
    },
  ];

  return columns;
}

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

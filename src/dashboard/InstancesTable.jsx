import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getInstances } from "../redux/apis/instancesSlice";
import { useSelector } from "react-redux";
import { Spin, Button, Dropdown, Table, Tag, App } from "antd";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { MdInstallDesktop } from "react-icons/md";
import { BsDatabaseCheck, BsDatabaseSlash } from "react-icons/bs";
import { TbRefreshDot, TbServerCog, TbTrash } from "react-icons/tb";
import styled from "styled-components";
import { toSentenceCase } from "../utils/helpers";
import { Icons } from "../components/Icons";
import ReactCountryFlag from "react-country-flag";
import { REGIONS } from "../data/regions";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

const InstancesTable = () => {
  const dispatch = useDispatch();
  const { instances, status } = useSelector((state) => state.instances);

  const { columns } = useInstancesTableColumns();

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
  const navigate = useNavigate();
  const { modal, message } = App.useApp();

  const handleInstanceAction = async (instanceId, action, successMessage) => {
    try {
      await api.post(`/vultr/${action}/${instanceId}`);
      message.success(successMessage);
    } catch (error) {
      message.error(error.response.data.message || `Failed to delete instance`);
    }
  };

  const handleDeleteServer = async (instanceId) => {
    try {
      await new Promise((r) => setTimeout(r, 5000));
      await api.delete(`/vultr/deleteInstance/${instanceId}`);
      message.success("Instance deleted!");
    } catch (error) {
      message.error(error.response.data.message || `Failed to delete instance`);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "label",
      showSorterTooltip: {
        target: "full-header",
      },
      render: (val) => (
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "3px" }}
        >
          <span
            style={
              !val && { fontStyle: "italic", color: "gray", fontSize: "14px" }
            }
          >
            {val || "Unlabeled instance"}
          </span>
        </div>
      ),
      sorter: (a, b) => a.server - b.server,
    },
    {
      title: "Region",
      dataIndex: "region",
      showSorterTooltip: {
        target: "full-header",
      },
      render: (region) => {
        const item = REGIONS[region];

        return item ? (
          <div
            style={{ display: "flex", alignItems: "center", columnGap: "8px" }}
          >
            <ReactCountryFlag
              svg
              style={{ width: "25px", height: "25px" }}
              countryCode={item.countryCode}
            />
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              {item.city}
            </span>
          </div>
        ) : (
          region.toUpperCase()
        );
      },
      sorter: (a, b) => a.region - b.region,
    },
    {
      title: "IP Address",
      dataIndex: "main_ip",
    },
    {
      title: "OS",
      dataIndex: "os",
      render: (val) => {
        const name = val.split(" ")?.[0]?.toLowerCase();
        const { icon: Icon, color } = Icons[name];
        return Icon ? <Icon color={color} size={25} /> : null;
      },
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
                onClick: () => navigate(`/instance/${record.id}`),
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
                onClick: () => {
                  const isRunning = record.power_status === "running";
                  modal.confirm({
                    title: "Are you sure?",
                    content: `This will ${isRunning ? "stop" : "start"} your instance!`,
                    okText: "Confirm",
                    okCancel: true,
                    onOk: async () => {
                      await handleInstanceAction(
                        record.id,
                        isRunning ? "stop" : "start",
                        `Server ${isRunning ? "stopped" : "started"}!`
                      );
                    },
                  });
                },
              },
              {
                key: "restart",
                label: (
                  <>
                    <TbRefreshDot size={16} style={{ marginRight: "8px" }} />
                    Reboot Server
                  </>
                ),
                onClick: () => {
                  modal.confirm({
                    title: "Are you sure?",
                    content: `This will restart your instance!`,
                    okText: "Confirm",
                    okCancel: true,
                    onOk: async () => {
                      await handleInstanceAction(
                        record.id,
                        "reboot",
                        `Server restarted!`
                      );
                    },
                  });
                },
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
                onClick: () => {
                  modal.confirm({
                    title: "Are you sure?",
                    content: `This will reinstall your instance!`,
                    okText: "Confirm",
                    okCancel: true,
                    onOk: async () => {
                      await handleInstanceAction(
                        record.id,
                        "reinstall",
                        `Server reinstalled!`
                      );
                    },
                  });
                },
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
                onClick: () => {
                  modal.error({
                    title: "Are you absolutely sure?",
                    content: `${record.label ? `Instance "${record.label}"` : "This instance"} will be deleted permanently. This action can't be undone!`,
                    okText: "Delete",
                    okCancel: true,
                    okButtonProps: { color: "danger" },
                    onOk: async () => handleDeleteServer(record.id),
                  });
                },
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

  return { columns };
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

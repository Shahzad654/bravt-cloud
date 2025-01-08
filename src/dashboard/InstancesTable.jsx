import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  getInstances,
  removeInstance,
  updateInstance,
} from "../redux/apis/instancesSlice";
import { useSelector } from "react-redux";
import { Button, Dropdown, Table, Tag, App } from "antd";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { MdInstallDesktop } from "react-icons/md";
import { BsDatabaseCheck, BsDatabaseSlash } from "react-icons/bs";
import {
  TbCopyCheckFilled,
  TbRefreshDot,
  TbServerCog,
  TbTrash,
} from "react-icons/tb";
import styled from "styled-components";
import { formatPrice, toSentenceCase } from "../utils/helpers";
import { getIcon } from "../components/Icons";
import ReactCountryFlag from "react-country-flag";
import { REGIONS } from "../data/regions";
import { api } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { TbCopy } from "react-icons/tb";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { RiTerminalBoxLine } from "react-icons/ri";
import NewWindow from "react-new-window";

const InstancesTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { instances, status } = useSelector((state) => state.instances);

  const { columns, isConsoleOpen, setIsConsoleOpen } =
    useInstancesTableColumns();

  useEffect(() => {
    dispatch(getInstances());
  }, [dispatch]);

  return (
    <>
      {isConsoleOpen && (
        <NewWindow
          center="parent"
          url={isConsoleOpen}
          onUnload={() => setIsConsoleOpen(null)}
          features={{ width: 1200, height: 650 }}
        />
      )}
      <StyledTable
        columns={columns}
        dataSource={instances}
        loading={status === "loading"}
        style={{ marginTop: "25px" }}
        rowClassName="cursor-pointer"
        onRow={(record) => ({
          onClick: () => navigate(`/instance/${record.id}`),
        })}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
    </>
  );
};

export default InstancesTable;

function useInstancesTableColumns() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { modal, message } = App.useApp();
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const [isConsoleOpen, setIsConsoleOpen] = useState(null);

  const handleInstanceAction = async (
    instanceId,
    action,
    successMessage,
    onSuccess
  ) => {
    try {
      await api.post(`/vultr/${action}/${instanceId}`);
      message.success(successMessage);
      if (onSuccess) dispatch(onSuccess);
    } catch (error) {
      message.error(error.response.data.message || `Failed to delete instance`);
    }
  };

  const handleDeleteServer = async (instanceId) => {
    try {
      await new Promise((r) => setTimeout(r, 5000));
      await api.delete(`/vultr/deleteInstance/${instanceId}`);
      message.success("Instance deleted!");
      dispatch(removeInstance(instanceId));
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
      render: (val, record) => (
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "3px" }}
        >
          <Link
            to={`/instance/${record.id}`}
            style={{
              fontSize: "15px",
              fontWeight: "600",
              whiteSpace: "pre",
              color: "black",
              textDecoration: "none",
            }}
          >
            {val || "Cloud Instance"}
          </Link>
          <div
            style={{ display: "flex", alignItems: "center", columnGap: "2px" }}
          >
            <Link
              to={`/instance/${record.id}`}
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#a1a1aa",
                whiteSpace: "pre",
                textDecoration: "none",
              }}
            >
              {record.ram} MB Regular Cloud Compute -
            </Link>
            <IPButton
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                copyToClipboard(record.main_ip);
              }}
            >
              {record.main_ip}
              <CopyIcon>
                {isCopied ? <TbCopyCheckFilled /> : <TbCopy />}
              </CopyIcon>
            </IPButton>
          </div>
        </div>
      ),
      sorter: (a, b) => a.label - b.label,
    },
    {
      title: "OS",
      dataIndex: "os",
      render: (val) => {
        const { icon: Icon, color } = getIcon(val);
        return Icon ? <Icon color={color} size={25} /> : null;
      },
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
      title: "Charges",
      dataIndex: "creditsConsumed",
      showSorterTooltip: {
        target: "full-header",
      },
      render: (val) => (
        <span style={{ fontWeight: "500", color: "gray" }}>
          {formatPrice(val || 0)}
        </span>
      ),
      sorter: (a, b) => a.creditsConsumed - b.creditsConsumed,
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
                key: "console",
                label: (
                  <>
                    <RiTerminalBoxLine
                      size={16}
                      style={{ marginRight: "8px" }}
                    />
                    View Console
                  </>
                ),
                onClick: ({ domEvent }) => {
                  domEvent.stopPropagation();
                  domEvent.preventDefault();
                  setIsConsoleOpen(record.kvm);
                },
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
                onClick: ({ domEvent }) => {
                  domEvent.stopPropagation();
                  domEvent.preventDefault();
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
                        `Server ${isRunning ? "stopped" : "started"}!`,
                        updateInstance({
                          id: record.id,
                          power_status: isRunning ? "stopped" : "running",
                        })
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
                onClick: ({ domEvent }) => {
                  domEvent.stopPropagation();
                  domEvent.preventDefault();
                  modal.confirm({
                    title: "Are you sure?",
                    content: `This will restart your instance!`,
                    okText: "Confirm",
                    okCancel: true,
                    onOk: async () => {
                      await handleInstanceAction(
                        record.id,
                        "reboot",
                        `Server restarted!`,
                        updateInstance({
                          id: record.id,
                          power_status: "running",
                        })
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
                onClick: ({ domEvent }) => {
                  domEvent.stopPropagation();
                  domEvent.preventDefault();
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
                onClick: ({ domEvent }) => {
                  domEvent.stopPropagation();
                  domEvent.preventDefault();
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
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
      ),
    },
  ];

  return { columns, isConsoleOpen, setIsConsoleOpen };
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

const IPButton = styled.button`
  font-size: 12px;
  font-weight: 500;
  color: #a1a1aa;
  white-space: pre;
  cursor: pointer;
  background-color: transparent;
  padding: 0px;
  margin: 0px;
  border: 0px;
  outline: none;
  display: inline-flex;
  align-items: center;
  position: relative;

  &:hover {
    color: var(--primary-color);
  }
`;

const CopyIcon = styled.span`
  opacity: 0;
  transition: opacity 0.2s;
  margin-left: 4px;

  ${IPButton}:hover & {
    opacity: 1;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

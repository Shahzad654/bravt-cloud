import { useNavigate, useParams } from "react-router-dom";
import { useGetAllInstancesQuery } from "../../redux/apis/apiSlice";
import { isInstanceInstalling, toSentenceCase } from "../../utils/helpers";
import { CircularProgress } from "@mui/material";
import { Table, Tag } from "antd";
import ReactCountryFlag from "react-country-flag";
import { REGIONS } from "../../data/regions";
import { getIcon } from "../../components/Icons";
import styled from "styled-components";
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";

const FirewallLinkedInstances = () => {
  const { firewallId } = useParams();
  const { isLoading, data } = useGetAllInstancesQuery(firewallId);

  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const navigate = useNavigate();

  const CopyIcon = isCopied ? TbCopyCheckFilled : TbCopy;

  const columns = [
    {
      title: "Name",
      dataIndex: "label",
      showSorterTooltip: {
        target: "full-header",
      },
      render: (val, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "600",
              whiteSpace: "pre",
            }}
          >
            {val || "Cloud Instance"}
          </span>
          <div
            style={{ display: "flex", alignItems: "center", columnGap: "2px" }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#a1a1aa",
              }}
            >
              {record.ram} MB Regular Cloud Compute -
            </span>
            <button
              className="group text-xs font-medium gap-0.5 text-zinc-400 whitespace-pre cursor-pointer bg-transparent inline-flex items-center relative m-0 p-0 border-0 hover:text-primary outline-none transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                copyToClipboard(record.main_ip);
              }}
            >
              {record.main_ip}
              <CopyIcon
                size={14}
                className="opacity-0 group-hover:!opacity-100 transition-opacity"
              />
            </button>
          </div>
        </div>
      ),
      sorter: (a, b) => a.label.localeCompare(b.label),
    },
    {
      title: "OS",
      dataIndex: "os",
      render: (val) => {
        const { Icon, color } = getIcon(val);
        return Icon ? <Icon color={color} size={25} /> : val;
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
      sorter: (a, b) => a.region.localeCompare(b.region),
    },
    {
      title: "Status",
      dataIndex: "power_status",
      render: (status, record) => {
        const isInstalling = isInstanceInstalling(record);
        return (
          <Tag
            className="border !border-current"
            color={
              isInstalling
                ? "orange"
                : status === "running"
                  ? "success"
                  : "error"
            }
          >
            {isInstalling && (
              <CircularProgress
                size={10}
                style={{ marginRight: "6px" }}
                color="inherit"
              />
            )}
            {isInstalling ? "Installing" : toSentenceCase(status.toLowerCase())}
          </Tag>
        );
      },
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
  ];

  return (
    <StyledTable
      columns={columns}
      dataSource={data}
      loading={isLoading}
      style={{ marginTop: "25px" }}
      rowClassName={(record) =>
        `${isInstanceInstalling(record) ? "pointer-events-none" : "cursor-pointer"}`
      }
      onRow={(record) => ({
        onClick: () => {
          console.log(isInstanceInstalling(record));
          if (!isInstanceInstalling(record)) {
            navigate(`/instance/${record.id}`);
          }
        },
      })}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
    />
  );
};

export default FirewallLinkedInstances;

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

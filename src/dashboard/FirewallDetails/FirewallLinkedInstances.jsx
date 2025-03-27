import { useNavigate, useParams } from "react-router-dom"
import { useGetAllInstancesQuery } from "../../redux/apis/instances"
import { isInstanceInstalling, toSentenceCase } from "../../utils/helpers"
import { CircularProgress } from "@mui/material"
import { Table, Tag } from "antd"
import ReactCountryFlag from "react-country-flag"
import { REGIONS } from "../../data/regions"
import { getIcon } from "../../components/Icons"
import styled from "styled-components"
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb"
import useCopyToClipboard from "../../hooks/useCopyToClipboard"

const FirewallLinkedInstances = () => {
  const { firewallId } = useParams()
  const { isLoading, data } = useGetAllInstancesQuery(firewallId)

  const { isCopied, copyToClipboard } = useCopyToClipboard()
  const navigate = useNavigate()

  const CopyIcon = isCopied ? TbCopyCheckFilled : TbCopy

  const columns = [
    {
      title: "Name",
      dataIndex: "label",
      showSorterTooltip: {
        target: "full-header"
      },
      render: (val, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "15px",
              fontWeight: "600",
              whiteSpace: "pre"
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
                color: "#a1a1aa"
              }}
            >
              {record.ram} MB Regular Cloud Compute -
            </span>
            <button
              className="group text-xs font-medium gap-0.5 text-zinc-400 whitespace-pre cursor-pointer bg-transparent inline-flex items-center relative m-0 p-0 border-0 hover:text-primary outline-none transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                copyToClipboard(record.main_ip)
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
      sorter: (a, b) => a.label.localeCompare(b.label)
    },
    {
      title: "OS",
      dataIndex: "os",
      render: (val, record) => {
        const { Icon, color } = getIcon(val)
        return (
          <>
            {record.iconUrl ? (
              <img
                src={record.iconUrl}
                alt={record.os}
                style={{
                  width: "30px",
                  height: "30px",
                  objectFit: "contain",
                  objectPosition: "center"
                }}
              />
            ) : (
              <Icon color={color} size={30} />
            )}
          </>
        )
      }
    },
    {
      title: "Region",
      dataIndex: "region",
      showSorterTooltip: {
        target: "full-header"
      },
      render: (region) => {
        const item = REGIONS[region]

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
        )
      },
      sorter: (a, b) => a.region.localeCompare(b.region)
    },
    {
      title: "Status",
      dataIndex: "power_status",
      render: (status, record) => {
        const isInstalling = isInstanceInstalling(record)
        const isSuspended = record.status === "suspended" || record.suspended
        return (
          <Tag
            color={
              record.suspended
                ? "error"
                : isInstalling
                  ? "orange"
                  : status === "running"
                    ? "success"
                    : "error"
            }
          >
            {!isSuspended && isInstalling && (
              <CircularProgress
                size={10}
                style={{ marginRight: "6px" }}
                color="inherit"
              />
            )}
            {record.suspended
              ? "Suspended"
              : isSuspended
                ? "Under Maintenance"
                : isInstalling
                  ? "Installing"
                  : toSentenceCase(status.toLowerCase())}
          </Tag>
        )
      },
      filters: [
        {
          text: "Active",
          value: "running"
        },
        {
          text: "Stopped",
          value: "stopped"
        }
      ],
      onFilter: (value, record) => record.power_status.indexOf(value) === 0
    }
  ]

  return (
    <StyledTable
      columns={columns}
      dataSource={data}
      loading={isLoading}
      style={{ marginTop: "25px" }}
      rowClassName="cursor-pointer"
      onRow={(record) => ({
        onClick: () => navigate(`/instance/${record.id}`)
      })}
      showSorterTooltip={{
        target: "sorter-icon"
      }}
    />
  )
}

export default FirewallLinkedInstances

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
`

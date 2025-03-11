import { TbDiscOff } from "react-icons/tb"
import { formatDate, toSentenceCase } from "../../utils/helpers"
import { useGetGlobalSnapshotsQuery } from "../../redux/apis/snapshots"
import { getIcon } from "../../components/Icons"

const SnapshotSelect = ({ value, onValueChange }) => {
  const { isLoading, data } = useGetGlobalSnapshotsQuery()

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="grid-item animate-pulse"
            style={{ backgroundColor: "#d1d5db", height: "100px" }}
          />
        ))}
      </>
    )
  }

  if (!data?.length) {
    return (
      <div
        style={{
          padding: "40px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          rowGap: "8px"
        }}
      >
        <TbDiscOff size={28} color="gray" />
        <span style={{ fontSize: "16px" }}>No snapshots found!</span>
      </div>
    )
  }

  return (
    <>
      {data.map((item) => {
        const { Icon, color } = getIcon(item.description)
        return (
          <div
            key={item.id}
            className={`grid-item ${value === item.id ? "active" : ""}`}
            onClick={() => onValueChange(item.id)}
            style={{
              justifyContent: "normal",
              paddingLeft: "18px",
              paddingRight: "18px"
            }}
          >
            <Icon size={30} color={color} style={{ flexShrink: 0 }} />

            <div
              className="content"
              style={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              <span style={{ fontSize: "14px" }}>
                {toSentenceCase(item.type.toLowerCase())}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "gray",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {item.description}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "gray",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {formatDate(item.date_created)}
              </span>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default SnapshotSelect

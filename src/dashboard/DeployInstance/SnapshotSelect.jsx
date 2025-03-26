import { BsDisc } from "react-icons/bs"
import { TbDiscOff } from "react-icons/tb"
import { useGetSnapshotsQuery } from "../../redux/apis/snapshots"

const SnapshotSelect = ({ value, onValueChange }) => {
  const { isLoading, data } = useGetSnapshotsQuery()

  if (isLoading) {
    return (
      <div className="grid-layout">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="grid-item animate-pulse"
            style={{ backgroundColor: "#d1d5db", height: "100px" }}
          />
        ))}
      </div>
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
        <span style={{ fontSize: "16px" }}>No snapshot found!</span>
      </div>
    )
  }

  return (
    <div className="grid-layout">
      {data.map((item) => (
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
          <BsDisc
            size={30}
            color={value === item.id ? "var(--primary-color)" : "gray"}
            style={{ flexShrink: 0 }}
          />

          <div
            className="content"
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <span style={{ fontSize: "14px" }}>{item.description}</span>
            <span
              style={{
                fontSize: "11px",
                color: "gray",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {item.id}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SnapshotSelect

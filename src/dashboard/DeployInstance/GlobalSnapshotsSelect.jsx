import { useGetGlobalSnapshotsQuery } from "../../redux/apis/snapshots"
import { getIcon } from "../../components/Icons"

const GlobalSnapshotsSelect = ({ value, onValueChange }) => {
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

  return (
    <>
      {data.map((item) => {
        const { Icon, color } = getIcon(item.name)

        return (
          <div
            key={item.id}
            className={`grid-item ${value === item.id ? "active" : ""}`}
            onClick={() => onValueChange(item.id)}
            style={{ flexDirection: "column" }}
          >
            {item.iconUrl ? (
              <img
                src={item.iconUrl}
                alt={item.name}
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
            <div
              className="content"
              style={{ textAlign: "center", marginTop: "5px" }}
            >
              {item.name}
            </div>
            <span style={{ fontSize: "11px", color: "#71717a" }}>
              ({item.version})
            </span>
          </div>
        )
      })}
    </>
  )
}

export default GlobalSnapshotsSelect

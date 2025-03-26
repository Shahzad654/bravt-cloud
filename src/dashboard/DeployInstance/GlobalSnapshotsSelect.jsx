import { useGetGlobalSnapshotsQuery } from "../../redux/apis/snapshots";
import { getIcon, getOSName } from "../../components/Icons";
import { TbDiscOff } from "react-icons/tb";

const GlobalSnapshotsSelect = ({ value, onValueChange }) => {
  const { isLoading, data } = useGetGlobalSnapshotsQuery();

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
    );
  }

  if (!data?.length)
    return (
      <div
        style={{
          padding: "40px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          rowGap: "8px",
        }}
      >
        <TbDiscOff size={28} color="gray" />
        <span style={{ fontSize: "16px" }}>No custom OS found!</span>
      </div>
    );

  return (
    <>
      {data.map((item) => {
        const { Icon, color } = getIcon(item.type);
        return (
          <div
            key={item.id}
            className={`grid-item ${value === item.id ? "active" : ""}`}
            onClick={() => onValueChange(item.id)}
            style={{ flexDirection: "column" }}
          >
            <Icon color={color} size={30} />
            <div
              className="content"
              style={{ textAlign: "center", marginTop: "5px" }}
            >
              {getOSName(item.type)}
            </div>
            <span style={{ fontSize: "11px", color: "#71717a" }}>
              ({formatOSName(item.description, item.type)})
            </span>
          </div>
        );
      })}
    </>
  );
};

export default GlobalSnapshotsSelect;

function formatOSName(name, family) {
  return name.replace(new RegExp(`^${getOSName(family)}\\s`, "i"), "");
}

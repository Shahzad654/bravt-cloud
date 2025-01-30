import { Tag } from "antd";
import { formatPrice, toMonthlyPrice } from "../../utils/helpers";
import { LuDatabaseBackup } from "react-icons/lu";

const BackupsRadio = ({ value, onValueChange, plan }) => {
  const isEnabled = value === "enabled";

  return (
    <div
      role="button"
      onClick={() => onValueChange(isEnabled ? "disabled" : "enabled")}
      style={{
        maxWidth: "400px",
        borderRadius: "7px",
        marginTop: "24px",
        padding: "16px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        rowGap: "8px",
        border: "1px solid",
        borderColor: isEnabled ? "var(--primary-color)" : "#d1d5db",
        backgroundColor: isEnabled ? "#bfdbfe" : "white",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <LuDatabaseBackup
          size={20}
          color={isEnabled ? "var(--primary-color)" : "gray"}
        />
        <Tag color="blue-inverse">Recommended</Tag>
      </div>
      <p
        style={{
          margin: 0,
          padding: 0,
          fontWeight: "600",
          fontSize: "15px",
        }}
      >
        Auto Backups{" "}
        <span
          style={{
            fontSize: "15px",
            fontWeight: "400",
            color: "gray",
            marginLeft: "8px",
          }}
        >
          {formatPrice(toMonthlyPrice(plan?.backupCost))}/mo
        </span>
      </p>

      <p
        style={{
          color: "gray",
          fontSize: "14px",
          padding: 0,
          margin: 0,
        }}
      >
        Highly recommend for mission-critical systems. Backups enable easy
        recovery from a disaster by spinning up a new instance from a saved
        image.
      </p>
    </div>
  );
};

export default BackupsRadio;

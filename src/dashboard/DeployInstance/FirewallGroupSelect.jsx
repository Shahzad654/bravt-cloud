import { Select } from "antd";
import { useGetFirewallGroupsQuery } from "../../redux/apis/firewalls";
import { useMemo } from "react";

const FirewallGroupSelect = ({ firewallGroup, setFirewallGroup }) => {
  const { data, isLoading } = useGetFirewallGroupsQuery();

  const options = useMemo(() => {
    return data?.map((key) => ({
      value: key.id,
      label: key.description,
    }));
  }, [data]);

  return (
    <div>
      <label htmlFor="firewallGroup" style={{ fontSize: "14px" }}>
        Firewall Group
      </label>
      <Select
        showSearch
        id="firewallGroup"
        options={options}
        value={firewallGroup}
        onChange={setFirewallGroup}
        loading={isLoading}
        disabled={isLoading}
        style={{ width: "100%" }}
        placeholder="Select SSH Key"
        allowClear
      />
    </div>
  );
};

export default FirewallGroupSelect;

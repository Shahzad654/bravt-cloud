import { Select } from "antd";
import { useGetSSHKeysQuery } from "../../redux/apis/apiSlice";
import { useMemo } from "react";

const SSHKeySelect = ({ sshKey, setSSHKey }) => {
  const { data, isLoading } = useGetSSHKeysQuery();

  const options = useMemo(() => {
    return data?.map((key) => ({
      value: key.id,
      label: key.name,
    }));
  }, [data]);

  return (
    <div>
      <label htmlFor="sshKey" style={{ fontSize: "14px" }}>
        SSH Key
      </label>
      <Select
        showSearch
        id="sshKey"
        options={options}
        value={sshKey}
        onChange={setSSHKey}
        loading={isLoading}
        disabled={isLoading}
        style={{ width: "100%" }}
        placeholder="Select SSH Key"
        allowClear
      />
    </div>
  );
};

export default SSHKeySelect;

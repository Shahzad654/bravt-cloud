import { Select } from "antd";
import { useListSSHKeysQuery } from "../../redux/apis/ssh";
import { useMemo } from "react";

const SSHKeySelect = ({ sshKeys, setSSHKeys }) => {
  const { data, isLoading } = useListSSHKeysQuery();

  const options = useMemo(() => {
    return data?.map((key) => ({
      value: key.id,
      label: key.name,
    }));
  }, [data]);

  return (
    <div>
      <label htmlFor="sshKeys" style={{ fontSize: "14px" }}>
        SSH Keys
      </label>
      <Select
        showSearch
        id="sshKeys"
        mode="multiple"
        options={options}
        value={sshKeys}
        onChange={setSSHKeys}
        loading={isLoading}
        disabled={isLoading}
        style={{ width: "100%" }}
        placeholder="Select SSH Keys"
        allowClear
      />
    </div>
  );
};

export default SSHKeySelect;

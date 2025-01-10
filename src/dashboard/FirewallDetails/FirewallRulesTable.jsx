import styled from "styled-components";

import { App, message, Table } from "antd";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { TbTrash } from "react-icons/tb";
import {
  useDeleteFirewallRuleMutation,
  useGetFirewallRulesQuery,
} from "../../redux/apis/apiSlice";

const FirewallRulesTable = ({ ipType }) => {
  const { firewallId } = useParams();
  const { data } = useGetFirewallRulesQuery(firewallId);

  const { modal } = App.useApp();

  const rules = useMemo(() => {
    return data.firewallRules.filter((rule) => rule.ip_type === ipType);
  }, [data, ipType]);

  const [deleteFirewallRule] = useDeleteFirewallRuleMutation();

  const columns = [
    {
      title: "Action",
      dataIndex: "action",
    },
    {
      title: "Protocol",
      dataIndex: "protocol",
    },
    {
      title: "Port",
      dataIndex: "port",
    },
    {
      title: "Source",
      render: (value, record) => `${record.subnet}/${record.subnet_size}`,
    },
    {
      title: "Notes",
      dataIndex: "notes",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <button
          aria-label="Delete firewall"
          className="text-zinc-500 hover:text-red-600 transition-colors"
          onClick={() => {
            modal.error({
              title: "Are you absolutely sure?",
              content: `Firewall group "${data.description}"  will be deleted permanently. This action can't be undone!`,
              okText: "Delete",
              okCancel: true,
              okButtonProps: { color: "danger" },
              onOk: async () => {
                const { error } = await deleteFirewallRule({
                  id: firewallId,
                  ruleID: record.id,
                });

                if (error) {
                  message.error(
                    error.message || "Failed to update firewall rule"
                  );
                } else {
                  message.success("Firewall rule Deleted!");
                }
              },
            });
          }}
        >
          <TbTrash size={22} />
        </button>
      ),
    },
  ];

  return (
    <StyledTable
      columns={columns}
      dataSource={rules}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
      style={{ marginTop: "25px" }}
    />
  );
};

export default FirewallRulesTable;

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

import styled from "styled-components";

import { App, message, Table } from "antd";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { TbTrash } from "react-icons/tb";
import {
  useDeleteFirewallRuleMutation,
  useGetFirewallRulesQuery,
} from "../../redux/apis/firewalls";

const FirewallRulesTable = ({ ipType }) => {
  const { firewallId } = useParams();
  const { data } = useGetFirewallRulesQuery(firewallId);

  const { modal } = App.useApp();

  const rules = useMemo(() => {
    return data.rules.filter((rule) => rule.ip_type === ipType);
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
      render: (_, record) => (
        <button
          aria-label="Delete firewall"
          className="transition-colors text-zinc-500 hover:text-red-600"
          onClick={() => {
            modal.error({
              title: "Are you absolutely sure?",
              content: `Firewall rule will be deleted permanently. This action can't be undone!`,
              okText: "Delete",
              okCancel: true,
              okButtonProps: { color: "danger" },
              onOk: async () => {
                const { error } = await deleteFirewallRule({
                  id: firewallId,
                  ruleId: record.id,
                });

                if (error) {
                  message.error(
                    error.data.message || "Failed to delete firewall rule"
                  );
                } else {
                  message.success("Firewall rule deleted!");
                }
              },
            });
          }}
        >
          <TbTrash size={18} />
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

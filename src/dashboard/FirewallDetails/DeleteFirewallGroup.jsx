import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteFirewallGroupMutation,
  useGetFirewallRulesQuery,
} from "../../redux/apis/apiSlice";
import { App, message, Tooltip } from "antd";
import { TbTrash } from "react-icons/tb";

const DeleteFirewallGroup = () => {
  const navigate = useNavigate();
  const { firewallId } = useParams();
  const { data } = useGetFirewallRulesQuery(firewallId);

  const { modal } = App.useApp();

  const [deleteFirewallGroup] = useDeleteFirewallGroupMutation();

  return (
    <Tooltip title="Delete firewall">
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
              const { error } = await deleteFirewallGroup(firewallId);
              if (error) {
                message.error(error.message || "Failed to update firewall");
              } else {
                message.success("Firewall Deleted!");
                navigate("/firewall");
              }
            },
          });
        }}
      >
        <TbTrash size={22} />
      </button>
    </Tooltip>
  );
};

export default DeleteFirewallGroup;

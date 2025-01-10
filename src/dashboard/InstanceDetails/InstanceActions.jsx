import { RiTerminalBoxLine } from "react-icons/ri";
import { TbRefreshDot, TbServerBolt, TbTrash } from "react-icons/tb";
import { App, Tooltip } from "antd";
import { MdInstallDesktop, MdPowerSettingsNew } from "react-icons/md";
import {
  useDeleteInstanceMutation,
  useGetInstanceByIdQuery,
  useRebootInstanceMutation,
  useReinstallInstanceMutation,
  useStartOrStopInstanceMutation,
} from "../../redux/apis/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import NewWindow from "react-new-window";

const InstanceActions = () => {
  const navigate = useNavigate();
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  const { instanceId } = useParams();
  const { data } = useGetInstanceByIdQuery(instanceId);

  const { modal, message } = App.useApp();

  const isRunning = data.power_status === "running";

  const [startOrStopInstance] = useStartOrStopInstanceMutation();
  const [rebootInstance] = useRebootInstanceMutation();
  const [reinstallInstance] = useReinstallInstanceMutation();
  const [deleteInstance] = useDeleteInstanceMutation();

  return (
    <>
      {isConsoleOpen && (
        <NewWindow
          center="parent"
          url={data.kvm}
          onUnload={() => setIsConsoleOpen(false)}
          features={{ width: 1200, height: 650 }}
        />
      )}
      <div className="flex items-center gap-4">
        <Tooltip title="View console">
          <button
            aria-label="View console"
            className="text-zinc-500 hover:text-primary transition-colors"
            onClick={() => setIsConsoleOpen(true)}
          >
            <RiTerminalBoxLine size={22} />
          </button>
        </Tooltip>

        <Tooltip title={`Server ${isRunning ? "stop" : "start"}`}>
          <button
            aria-label={`Server ${isRunning ? " stop" : "start"}`}
            className="text-zinc-500 hover:text-primary transition-colors"
            onClick={() => {
              modal.confirm({
                title: "Are you sure?",
                content: `This will ${isRunning ? "stop" : "start"} your instance!`,
                okText: "Confirm",
                okCancel: true,
                onOk: async () => {
                  const { error } = await startOrStopInstance({
                    id: instanceId,
                    action: isRunning ? "stop" : "start",
                  });

                  if (error) {
                    message.error(
                      error.message ||
                        `Failed to ${isRunning ? "stop" : "start"} instance!`
                    );
                  } else {
                    message.success(
                      `Instance ${isRunning ? "stopped" : "started"} successfully!`
                    );
                  }
                },
              });
            }}
          >
            {data.power_status === "running" ? (
              <MdPowerSettingsNew size={22} />
            ) : (
              <TbServerBolt size={22} />
            )}
          </button>
        </Tooltip>

        <Tooltip title="Server restart">
          <button
            aria-label="Server restart"
            className="text-zinc-500 hover:text-primary transition-colors"
            onClick={() => {
              modal.confirm({
                title: "Are you sure?",
                content: `This will restart your instance!`,
                okText: "Confirm",
                okCancel: true,
                onOk: async () => {
                  const { error } = await rebootInstance({ id: instanceId });

                  if (error) {
                    message.error(
                      error.message || `Failed to reboot instance!`
                    );
                  } else {
                    message.success(`Instance restarted successfully!`);
                  }
                },
              });
            }}
          >
            <TbRefreshDot size={22} />
          </button>
        </Tooltip>

        <Tooltip title="Server reinstall">
          <button
            aria-label="Server reinstall"
            className="text-zinc-500 hover:text-primary transition-colors"
            onClick={() => {
              modal.confirm({
                title: "Are you absolutely sure?",
                content: `This will reinstall your instance!`,
                okText: "Confirm",
                okCancel: true,
                onOk: async () => {
                  const { error } = await reinstallInstance({
                    id: instanceId,
                  });

                  if (error) {
                    message.error(
                      error.message || `Failed to reinstall instance!`
                    );
                  } else {
                    message.success(`Instance reinstalled successfully!`);
                  }
                },
              });
            }}
          >
            <MdInstallDesktop size={22} />
          </button>
        </Tooltip>

        <Tooltip title="Server destroy">
          <button
            aria-label="Server destroy"
            className="text-zinc-500 hover:text-red-600 transition-colors"
            onClick={() => {
              modal.error({
                title: "Are you absolutely sure?",
                content: `${data.label ? `Instance "${data.label}"` : "This instance"} will be deleted permanently. This action can't be undone!`,
                okText: "Delete",
                okCancel: true,
                okButtonProps: { color: "danger" },
                onOk: async () => {
                  const { error } = await deleteInstance({ id: instanceId });
                  if (error) {
                    message.error(
                      error.message || `Failed to delete instance!`
                    );
                  } else {
                    navigate("/instance");
                    message.success(`Instance deleted successfully!`);
                  }
                },
              });
            }}
          >
            <TbTrash size={22} />
          </button>
        </Tooltip>
      </div>
    </>
  );
};

export default InstanceActions;

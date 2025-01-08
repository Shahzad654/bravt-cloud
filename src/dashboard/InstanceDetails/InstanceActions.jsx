import { RiTerminalBoxLine } from "react-icons/ri";
import { TbRefreshDot, TbServerBolt, TbTrash } from "react-icons/tb";
import { App, Tooltip } from "antd";
import { MdInstallDesktop, MdPowerSettingsNew } from "react-icons/md";
import { api } from "../../utils/api";
import { useDispatch } from "react-redux";
import {
  removeInstance,
  updateInstance,
} from "../../redux/apis/instancesSlice";
import { useGetInstanceByIdQuery } from "../../redux/apis/queriesSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import NewWindow from "react-new-window";

const InstanceActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  const { instanceId } = useParams();
  const { data, refetch } = useGetInstanceByIdQuery(instanceId);

  const { modal, message } = App.useApp();

  const isRunning = data.power_status === "running";

  const handleInstanceAction = async (action, successMessage, onSuccess) => {
    try {
      await api.post(`/vultr/${action}/${instanceId}`);
      message.success(successMessage);
      refetch();
      if (onSuccess) dispatch(onSuccess);
    } catch (error) {
      message.error(error.response.data.message || `Failed to delete instance`);
    }
  };

  const handleDeleteServer = async () => {
    try {
      await new Promise((r) => setTimeout(r, 5000));
      await api.delete(`/vultr/deleteInstance/${instanceId}`);
      message.success("Instance deleted!");
      navigate("/instance");
      dispatch(removeInstance(instanceId));
      refetch();
    } catch (error) {
      message.error(error.response.data.message || `Failed to delete instance`);
    }
  };

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
                  await handleInstanceAction(
                    isRunning ? "stop" : "start",
                    `Server ${isRunning ? "stopped" : "started"}!`,
                    updateInstance({
                      id: data.id,
                      power_status: isRunning ? "stopped" : "running",
                    })
                  );
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
                  await handleInstanceAction(
                    "reboot",
                    `Server restarted!`,
                    updateInstance({
                      id: data.id,
                      power_status: "running",
                    })
                  );
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
                  await handleInstanceAction(
                    "reinstall",
                    `Server reinstalled!`
                  );
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
                onOk: handleDeleteServer,
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

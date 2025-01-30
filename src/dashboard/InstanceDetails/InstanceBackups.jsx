import { useParams } from "react-router-dom";
import { App, Card, message } from "antd";
import {
  useGetInstanceBackupScheduleQuery,
  useUpdateInstanceMutation,
} from "../../redux/apis/instances";

import PageSpinner from "../../components/PageSpinner";
import BackupScheduleForm from "./BackupScheduleForm";
import BackupsTable from "./BackupsTable";

const InstanceBackups = () => {
  const { modal } = App.useApp();
  const { instanceId } = useParams();
  const { data: backupSchedule, isLoading: isScheduleLoading } =
    useGetInstanceBackupScheduleQuery(instanceId);

  const isEnabled = backupSchedule?.enabled;

  const [updateInstance, { isLoading }] = useUpdateInstanceMutation();

  function handleUpdateInstance() {
    modal.info({
      title: `${isEnabled ? "Disable" : "Enable"} backups`,
      content: isEnabled
        ? "Automatic backups prevent permanent data loss and are a cost-effective-way to ensure you never lose your data."
        : "Automatic backups will be disabled & you might loss your data!",
      cancelText: "Cancel",
      okCancel: true,
      okType: isEnabled ? "danger" : "primary",
      okText: isEnabled ? "Disable" : "Enable",
      onOk: async () => {
        const { error } = await updateInstance({
          id: instanceId,
          backups: isEnabled ? "disabled" : "enabled",
        });

        if (error) {
          message.error(error.data.message || "Failed to update instance!");
          return;
        }

        message.success("Backup status updated!");
      },
    });
  }

  if (isScheduleLoading) {
    return <PageSpinner style={{ height: "64vh" }} />;
  }

  return (
    <div className="w-full bg-white">
      <BackupsTable />

      {isEnabled && (
        <Card className="w-full max-w-2xl mt-4 border">
          <h1 className="text-2xl font-semibold">Backup Schedule</h1>
          <p className="mt-2 mb-4 text-sm text-zinc-500">
            Next scheduled backup:{" "}
            <span className="text-sm font-medium text-black">
              {backupSchedule.next_scheduled_time_utc} UTC
            </span>
          </p>
          <BackupScheduleForm />
        </Card>
      )}

      <Card className="w-full max-w-2xl mt-4 border">
        <h1 className="text-2xl font-semibold ">Backup Status</h1>
        <p className="mt-2 mb-4 text-sm text-zinc-500">
          Backups are currently {isEnabled ? "enabled" : "disabled"} for this
          instance
        </p>
        <button
          disabled={isLoading}
          onClick={handleUpdateInstance}
          className="flex items-center justify-center w-full h-11 transition-colors text-white rounded-md bg-primary text-[15px] hover:!bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEnabled ? "Disable Backups" : "Enable Backups"}
        </button>
      </Card>
    </div>
  );
};

export default InstanceBackups;

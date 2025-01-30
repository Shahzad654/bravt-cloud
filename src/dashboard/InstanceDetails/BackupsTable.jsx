import { App, message, Table, Tag, Tooltip } from "antd";
import { toSentenceCase } from "../../utils/helpers";
import {
  useGetInstanceByIdQuery,
  useListBackupsQuery,
  useRestoreInstanceMutation,
} from "../../redux/apis/instances";
import { useParams } from "react-router-dom";
import { LuArchiveRestore } from "react-icons/lu";
import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";

const BackupsTable = () => {
  const { modal } = App.useApp();
  const { instanceId } = useParams();
  const { data: instance } = useGetInstanceByIdQuery(instanceId);

  const previousDataRef = useRef();
  const [pollingInterval, setPollingInterval] = useState(0);

  const { data, isLoading } = useListBackupsQuery(instanceId, {
    pollingInterval,
    selectFromResult: ({ data, isLoading, ...rest }) => ({
      data: data ?? previousDataRef.current,
      isLoading: previousDataRef.current ? false : isLoading,
      ...rest,
    }),
  });

  const isAnyBackupPending = useMemo(() => {
    return data?.some((backup) => backup.status === "pending");
  }, [data]);

  useEffect(() => {
    if (data) {
      previousDataRef.current = data;
    }
  }, [data]);

  useEffect(() => {
    if (isAnyBackupPending) {
      setPollingInterval(5000);
    } else {
      setPollingInterval(0);
    }
  }, [isAnyBackupPending]);

  const [restoreInstance] = useRestoreInstanceMutation();

  const columns = [
    {
      title: "Label",
      dataIndex: "description",
    },
    {
      title: "Size",
      dataIndex: "size",
      render: (val) => `${val / 1024 / 1024 / 1024} GB`,
    },
    {
      title: "Date",
      dataIndex: "date_created",
      render: (val) => format(val, "dd MMM yyyy hh:mm a"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (val) => (
        <Tag
          color={
            val === "pending" ? "blue" : val === "complete" ? "green" : "red"
          }
        >
          {toSentenceCase(val)}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const isPending = record.status === "pending";

        return (
          <Tooltip title={isPending ? "Backup Pending" : "Restore backup"}>
            <button
              disabled={isPending}
              aria-label="Restore backup"
              className="px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                modal.confirm({
                  title: "Restore backup",
                  content: `This will restore backup "${record.description}" on ${instance.label ? `instance "${instance.label}"` : "this instance"}`,
                  okText: "Restore",
                  okCancel: true,
                  onOk: async () => {
                    const { error } = await restoreInstance({
                      id: instanceId,
                      backup_id: record.id,
                    });
                    if (error) {
                      message.error(
                        error.data.message || "Failed to restore backup"
                      );
                    } else {
                      message.success("Backup Restored!");
                    }
                  },
                });
              }}
            >
              <LuArchiveRestore size={18} />
            </button>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div className="w-full mt-4 bg-white">
      <h1 className="text-2xl font-semibold">Restore Backup</h1>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        style={{ marginTop: "25px" }}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
    </div>
  );
};

export default BackupsTable;

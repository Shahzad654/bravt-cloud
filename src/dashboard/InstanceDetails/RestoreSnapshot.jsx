import { App, message, Table, Tag, Tooltip } from "antd";
import { LuArchiveRestore } from "react-icons/lu";
import { useGetSnapshotsQuery } from "../../redux/apis/snapshots";
import { formatDate, toSentenceCase } from "../../utils/helpers";
import {
  useGetInstanceByIdQuery,
  useRestoreInstanceMutation,
} from "../../redux/apis/instances";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

const RestoreSnapshot = () => {
  const { modal } = App.useApp();

  const previousDataRef = useRef();
  const [pollingInterval, setPollingInterval] = useState(0);

  const { data, isLoading } = useGetSnapshotsQuery(undefined, {
    pollingInterval,
    selectFromResult: ({ data, isLoading, ...rest }) => ({
      data: data ?? previousDataRef.current,
      isLoading: previousDataRef.current ? false : isLoading,
      ...rest,
    }),
  });

  const isAnySnapshotPending = useMemo(() => {
    return data?.some((snapshot) => snapshot.status === "pending");
  }, [data]);

  useEffect(() => {
    if (data) {
      previousDataRef.current = data;
    }
  }, [data]);

  useEffect(() => {
    if (isAnySnapshotPending) {
      setPollingInterval(5000);
    } else {
      setPollingInterval(0);
    }
  }, [isAnySnapshotPending]);

  const [restoreInstance] = useRestoreInstanceMutation();

  const { instanceId } = useParams();
  const { data: instance } = useGetInstanceByIdQuery(instanceId);

  const columns = [
    {
      title: "Label",
      dataIndex: "description",
      sorter: (a, b) => a.description?.localeCompare(b.description),
      showSorterTooltip: {
        target: "full-header",
      },
    },
    {
      title: "Size",
      dataIndex: "compressed_size",
      render: (val) => `${(val / 1024 / 1024 / 1024).toFixed(2)} GB`,
      showSorterTooltip: {
        target: "full-header",
      },
    },
    {
      title: "Date",
      dataIndex: "date_created",
      render: formatDate,
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
      title: "Restore",
      key: "restore",
      render: (_, record) => {
        const isPending = record.status === "pending";

        return (
          <Tooltip title={isPending ? "Snapshot Pending" : "Restore snapshot"}>
            <button
              disabled={isPending}
              aria-label="Restore snapshot"
              className="px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                modal.confirm({
                  title: "Restore snapshot",
                  content: `This will restore snapshot "${record.description}" on ${instance.label ? `instance "${instance.label}"` : "this instance"}`,
                  okText: "Restore",
                  okCancel: true,
                  onOk: async () => {
                    const { error } = await restoreInstance({
                      id: instanceId,
                      snapshot_id: record.id,
                    });

                    if (error) {
                      message.error(
                        error.data.message || "Failed to restore snapshot"
                      );
                    } else {
                      message.success("Snapshot Restored!");
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
      <h1 className="text-2xl font-semibold">Restore Snapshot</h1>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
        style={{ marginTop: "25px" }}
      />
    </div>
  );
};

export default RestoreSnapshot;

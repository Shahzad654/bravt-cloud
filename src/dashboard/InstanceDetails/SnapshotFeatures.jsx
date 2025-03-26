import { Skeleton } from "antd";
import { useGetSnapshotCostQuery } from "../../redux/apis/snapshots";
import { formatPrice } from "../../utils/helpers";

export default function SnapshotFeatures() {
  const { data, isLoading } = useGetSnapshotCostQuery();

  return (
    <Skeleton loading={isLoading}>
      <ul className="space-y-2 list-disc px-4 mt-6 !text-sm leading-snug text-zinc-400">
        <li>
          Stored snapshots will cost {formatPrice(data?.cost ?? 0)}
          /GB per month - pricing subject to change.
        </li>
        <li>
          We recommend using DHCP for networking. By default, Bravt Cloud
          instances are configured to use DHCP.
        </li>
        <li>
          Snapshots can only be restored to equal or bigger disks. If there is a
          single partition, it will be automatically expanded.
        </li>
      </ul>
    </Skeleton>
  );
}

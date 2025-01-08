import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { HiArrowLeft } from "react-icons/hi2";
import { getIcon } from "../../components/Icons";
import { useGetInstanceByIdQuery } from "../../redux/apis/queriesSlice";
import { formatDistanceToNow } from "date-fns";
import PageSpinner from "../../components/PageSpinner";
import InstanceActions from "./InstanceActions";
import InstanceTabs from "./InstanceTabs";
import NotFound from "../../components/NotFound";

const InstanceDetails = () => {
  const { instanceId } = useParams();

  const { status, data } = useGetInstanceByIdQuery(instanceId);

  if (status === "pending") {
    return <PageSpinner />;
  }

  if (!data) {
    return <NotFound />;
  }

  const { Icon, color } = getIcon(data.os);

  return (
    <div className="tailwind-layout">
      <div className="w-full py-8 px-12">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Link
              to="/instance"
              className="aspect-square rounded-full bg-blue-100 p-2.5 shrink-0 text-primary"
            >
              <HiArrowLeft size={24} />
            </Link>

            <div className="flex items-center gap-3">
              {Icon ? <Icon color={color} size={42} /> : null}
              <div className="space-y-1.5">
                <h2 className="text-3xl font-medium">
                  {data.label || "Server Information"}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-400">{data.main_ip}</span>
                  <span className="text-xs text-zinc-400">
                    Created{" "}
                    {formatDistanceToNow(data.date_created, {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <InstanceActions />
        </div>

        <div className="w-full mt-12">
          <InstanceTabs />
        </div>
      </div>
    </div>
  );
};

export default InstanceDetails;

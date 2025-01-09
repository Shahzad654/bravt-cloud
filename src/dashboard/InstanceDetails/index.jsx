import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { HiArrowLeft } from "react-icons/hi2";
import { getIcon } from "../../components/Icons";
import { useGetInstanceByIdQuery } from "../../redux/apis/apiSlice";
import { formatDistanceToNow } from "date-fns";
import PageSpinner from "../../components/PageSpinner";
import InstanceActions from "./InstanceActions";
import InstanceTabs from "./InstanceTabs";
import NotFound from "../../components/NotFound";
import UpdateLabel from "./UpdateLabel";
import { useEffect, useMemo, useRef, useState } from "react";
import { isInstanceInstalling } from "../../utils/helpers";
import { Spin } from "antd";

const InstanceDetails = () => {
  const previousDataRef = useRef();
  const { instanceId } = useParams();
  const [pollingInterval, setPollingInterval] = useState(0);

  const { isLoading, data } = useGetInstanceByIdQuery(instanceId, {
    pollingInterval,
    selectFromResult: ({ data, isLoading, ...rest }) => ({
      data: data ?? previousDataRef.current,
      isLoading: previousDataRef.current ? false : isLoading,
      ...rest,
    }),
  });

  useEffect(() => {
    if (data) {
      previousDataRef.current = data;
    }
  }, [data]);

  const isInstalling = useMemo(() => isInstanceInstalling(data), [data]);

  useEffect(() => {
    if (isInstalling) {
      setPollingInterval(5000);
    } else {
      setPollingInterval(0);
    }
  }, [isInstalling]);

  if (isLoading) {
    return <PageSpinner />;
  }

  if (!data) {
    return <NotFound />;
  }

  const { Icon, color } = getIcon(data.os);

  return (
    <>
      {isInstalling && (
        <Spin size="large" spinning fullscreen tip="Installing..." />
      )}
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
                  <UpdateLabel size="lg">
                    <h2 className="text-3xl font-medium cursor-pointer">
                      {data.label || "Server Information"}
                    </h2>
                  </UpdateLabel>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-400">
                      {data.main_ip}
                    </span>
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
    </>
  );
};

export default InstanceDetails;

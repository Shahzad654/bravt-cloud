import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { HiArrowLeft } from "react-icons/hi2";
import { getIcon } from "../../components/Icons";
import { useGetInstanceByIdQuery } from "../../redux/apis/instances";
import { formatDistanceToNow } from "date-fns";
import PageSpinner from "../../components/PageSpinner";
import InstanceActions from "./InstanceActions";
import InstanceTabs from "./InstanceTabs";
import NotFound from "../../components/NotFound";
import UpdateLabel from "./UpdateLabel";
import { useEffect, useRef, useState } from "react";
import { isInstanceInstalling } from "../../utils/helpers";
import { CircularProgress } from "@mui/material";

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

  const isInstalling = isInstanceInstalling(data);

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
    <div className="tailwind-layout">
      <div className="w-full px-12 py-8">
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
                <div className="flex items-center gap-4">
                  <UpdateLabel size="lg">
                    <h2 className="text-3xl font-medium cursor-pointer">
                      {data.label || "Server Information"}
                    </h2>
                  </UpdateLabel>

                  {isInstalling && (
                    <div className="flex items-center text-amber-600">
                      <CircularProgress size={14} color="inherit" />
                      <span className="mx-1 ml-2 text-sm">Installing</span>
                      <span className="typing-dots">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                      </span>
                    </div>
                  )}
                </div>

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

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { HiArrowLeft } from "react-icons/hi2";
import { getIcon } from "../../components/Icons";

const InstanceDetails = () => {
  const { instanceId } = useParams();

  const { Icon, color } = getIcon("");

  useEffect(() => {
    import("./InstanceDetails.css");
  }, []);

  return (
    <div className="space-y-8 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/instance"
            className="aspect-square rounded-full bg-blue-100 p-2.5 shrink-0 text-primary"
          >
            <HiArrowLeft size={24} />
          </Link>

          {Icon ? <Icon color={color} /> : null}
        </div>
      </div>
    </div>
  );
};

export default InstanceDetails;

import { useParams } from "react-router-dom";
import { useGetInstanceByIdQuery } from "../../redux/apis/instances";
import { REGIONS } from "../../data/regions";
import ReactCountryFlag from "react-country-flag";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { TbCopy, TbCopyCheckFilled } from "react-icons/tb";
import BandwidthUsage from "./BandwidthUsage";
import CreditsUsage from "./CreditsUsage";
import UpdateLabel from "./UpdateLabel";

const InstanceOverview = () => {
  const { instanceId } = useParams();
  const { data } = useGetInstanceByIdQuery(instanceId);
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const region = REGIONS[data.region];

  return (
    <div className="w-full mt-4 bg-white">
      <div className="grid w-full grid-cols-3 gap-8 divide-x divide-zinc-300">
        <div className="space-y-3 font-medium">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-2/3 py-2 text-sm text-zinc-500">Location:</td>
                <td className="py-2">
                  {region ? (
                    <div className="flex items-center w-1/3 gap-2">
                      <ReactCountryFlag
                        svg
                        style={{ width: "25px", height: "25px" }}
                        countryCode={region.countryCode}
                      />
                      <span className="text-sm">{region.city}</span>
                    </div>
                  ) : (
                    <span className="text-sm">{data.region.toUpperCase()}</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="w-2/3 py-2 text-sm text-zinc-500">
                  IP Address:
                </td>
                <td className="py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-normal">{data.main_ip}</span>
                    <button
                      onClick={() => copyToClipboard(data.main_ip)}
                      className={`transition-colors ${isCopied ? "text-blue-500" : "hover:text-blue-500 text-zinc-400"}`}
                    >
                      {isCopied ? (
                        <TbCopyCheckFilled size={18} />
                      ) : (
                        <TbCopy size={18} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-2/3 py-2 text-sm text-zinc-500">Username:</td>
                <td className="py-2">
                  <div className="text-sm">{data.user_scheme}</div>
                </td>
              </tr>
              <tr>
                <td className="w-2/3 py-2 text-sm text-zinc-500">Hostname:</td>
                <td className="py-2">
                  <div className="text-sm">{data.hostname}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pl-8 space-y-3 font-medium">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-2/3 py-2 text-sm text-zinc-500">vCPU/s:</td>
                <td className="py-2">
                  <div className="text-sm">
                    {data.vcpu_count} vCPU{data.vcpu_count > 1 ? "s" : ""}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="w-2/3 py-2 text-sm text-zinc-500">RAM:</td>
                <td className="py-2">
                  <div className="text-sm">{data.ram.toFixed(2)} MB</div>
                </td>
              </tr>
              <tr>
                <td className="w-2/3 py-2 text-sm text-zinc-500">Storage:</td>
                <td className="py-2">
                  <div className="text-sm">{data.disk.toFixed(2)} GB SSD</div>
                </td>
              </tr>
              <tr>
                <td className="w-2/3 py-2 text-sm text-zinc-500">Bandwidth:</td>
                <td className="py-2">
                  <div className="text-sm">{data.allowed_bandwidth} GB</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="pl-8 space-y-3 font-medium">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-2/3 py-2 text-sm text-zinc-500">Label:</td>
                <td className="py-2">
                  <UpdateLabel />
                </td>
              </tr>
              <tr>
                <td className="w-2/3 py-2 text-sm text-zinc-500">OS:</td>
                <td className="py-2">
                  <div className="text-sm">{data.os}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        <BandwidthUsage />
        <CreditsUsage />
      </div>
    </div>
  );
};

export default InstanceOverview;

import { HiArrowLeft } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { useGetFirewallRulesQuery } from "../../redux/apis/apiSlice";
import PageSpinner from "../../components/PageSpinner";
import NotFound from "../../components/NotFound";
import DeleteFirewallGroup from "./DeleteFirewallGroup";
import { format } from "date-fns";
import EditDescription from "./EditDescription";
import { Card, Tabs } from "antd";
import { useState } from "react";
import CreateFirewallRuleModal from "./CreateFirewallRuleModal";
import FirewallRulesTable from "./FirewallRulesTable";

const FirewallDetails = () => {
  const { firewallId } = useParams();
  const { data, isLoading } = useGetFirewallRulesQuery(firewallId);

  const [activeTab, setActiveTab] = useState("v4");

  if (isLoading) {
    return <PageSpinner />;
  }

  if (!data || !data.firewallGroup) {
    return <NotFound href="/firewall" />;
  }

  return (
    <div className="tailwind-layout">
      <div className="w-full py-8 px-12 space-y-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Link
              to="/firewall"
              className="aspect-square rounded-full bg-blue-100 p-2.5 shrink-0 text-primary"
            >
              <HiArrowLeft size={24} />
            </Link>

            <div className="space-y-1.5">
              <h2 className="text-3xl font-medium cursor-pointer">
                Manage Firewall Group
              </h2>
              <div className="flex items-center gap-3">
                <p className="text-xs text-zinc-500">
                  Group ID: <strong>{firewallId}</strong>
                </p>
                <p className="text-xs text-zinc-500">
                  Date created:{" "}
                  <strong>
                    {format(data.firewallGroup.date_created, "PP")}
                  </strong>
                </p>
                <p className="text-xs text-zinc-500">
                  Date modified:{" "}
                  <strong>
                    {format(data.firewallGroup.date_modified, "PP")}
                  </strong>
                </p>
              </div>
            </div>
          </div>

          <DeleteFirewallGroup />
        </div>
        <div className="grid grid-cols-3 w-full gap-6">
          <EditDescription />
          <Card hoverable className="border" onClick={() => setActiveTab("v4")}>
            <p className="font-medium text-sm text-zinc-500">Group Rules</p>
            <p>
              <span className="text-3xl font-medium text-primary">
                {data.firewallGroup.rule_count}
              </span>
              <span className="text-zinc-400">
                /{data.firewallGroup.max_rule_count}
              </span>
            </p>
          </Card>
          <Card hoverable className="border">
            <p className="font-medium text-sm text-zinc-500">
              Linked Instances
            </p>
            <p className="text-3xl font-medium text-primary">
              {data.firewallGroup.instance_count}
            </p>
          </Card>
        </div>

        <Tabs
          tabPosition="left"
          className="mt-8"
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "v4",
              label: "IPv4 Rules",
              children: (
                <>
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">
                      Inbound IPv4 Rules
                    </h1>
                    <CreateFirewallRuleModal ip_type={activeTab} />
                  </div>
                  <FirewallRulesTable ipType="v4" />
                </>
              ),
            },
            {
              key: "v6",
              label: "IPv6 Rules",
              children: (
                <>
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">
                      Inbound IPv6 Rules
                    </h1>
                    <CreateFirewallRuleModal ip_type={activeTab} />
                  </div>
                  <div className="p-3 rounded-none my-8 border-l-8 text-amber-500 font-medium border-amber-400 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
                    This firewall ruleset will not be active until at least one
                    rule is added.
                  </div>
                  <FirewallRulesTable ipType="v6" />
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default FirewallDetails;

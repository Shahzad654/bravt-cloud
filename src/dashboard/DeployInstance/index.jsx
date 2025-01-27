import { useMemo, useState } from "react";
import styled from "styled-components";
import {
  Breadcrumb,
  Button,
  Input,
  Layout,
  message,
  notification,
  Spin,
  Tabs,
} from "antd";
import DashHeader from "../../components/DashHeader";
import ImageSelect from "./ImageSelect";
import PlansSelect from "./PlansSelect";
import RegionsSelect from "./RegionsSelect";
import { useNavigate } from "react-router-dom";
import SSHKeySelect from "./SSHKeySelect";
import FirewallGroupSelect from "./FirewallGroupSelect";
import {
  useCreateInstanceMutation,
  useGetPlansQuery,
} from "../../redux/apis/instances";
import ISOSelect from "./ISOSelect";
import { formatPrice } from "../../utils/helpers";

const { Content } = Layout;

const DeployInstance = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [label, setLabel] = useState("");
  const [hostname, setHostname] = useState("");
  const [sshKeys, setSSHKeys] = useState([]);
  const [firewallGroup, setFirewallGroup] = useState("");
  const [selectedISO, setSelectedISO] = useState(null);

  const { data: plans } = useGetPlansQuery(selectedRegion);
  const plan = useMemo(
    () => plans?.find((p) => p.plan === selectedPlan),
    [plans, selectedPlan]
  );

  const [createInstance, { isLoading }] = useCreateInstanceMutation();

  const handleCreateInstance = async () => {
    if (
      !selectedPlan ||
      !selectedRegion ||
      !hostname ||
      !label ||
      (!selectedImage && !selectedISO)
    ) {
      message.error("Please fill all the required fields!");
      return;
    }

    const { error, data } = await createInstance({
      label,
      hostname,
      region: selectedRegion,
      plan: selectedPlan,
      os_id: selectedImage,
      sshkey_id: sshKeys,
      firewall_group_id: firewallGroup,
      iso_id: selectedISO,
    });

    if (error) {
      message.error(error.data.message || "Failed to create instance!");
    } else {
      navigate(`/instance/${data.id}`);
      notification.success({
        message: "Instance created successfully!",
        description: "Your instance will be ready within 3 to 5 minutes",
      });
    }
  };

  return (
    <>
      {isLoading && (
        <Spin
          size="large"
          spinning
          percent="auto"
          fullscreen
          tip={<p style={{ marginTop: "52px" }}>Creating Instance...</p>}
        />
      )}

      <Layout style={{ minHeight: "100vh" }}>
        <Layout style={{ backgroundColor: "white" }}>
          <DashHeader />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb
              style={{
                margin: "16px 0px 0px 24px",
                fontSize: "var(--m-heading)",
                color: "black",
                fontWeight: "600",
              }}
            >
              Deploy New Instance
            </Breadcrumb>
            <div
              style={{
                padding: "24px 24px 0px 24px",
                minHeight: 360,
                background: "white",
                borderRadius: "8px",
              }}
            >
              <PageContent>
                <RegionsSelect
                  value={selectedRegion}
                  onValueChange={setSelectedRegion}
                />

                <Tabs
                  style={{ marginTop: "20px" }}
                  items={[
                    {
                      label: "Operating System",
                      key: "os",
                      children: (
                        <ImageSelect
                          value={selectedImage}
                          onValueChange={(val) => {
                            setSelectedImage(val);
                            setSelectedISO(null);
                          }}
                        />
                      ),
                    },
                    {
                      key: "iso",
                      label: "ISO",
                      children: (
                        <ISOSelect
                          value={selectedISO}
                          onValueChange={(val) => {
                            setSelectedISO(val);
                            setSelectedImage(null);
                          }}
                        />
                      ),
                    },
                  ]}
                />

                <PlansSelect
                  value={selectedPlan}
                  onValueChange={setSelectedPlan}
                  region={selectedRegion}
                />

                <div
                  style={{
                    display: "grid",
                    columnGap: "12px",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    marginTop: "20px",
                  }}
                >
                  <div>
                    <label htmlFor="label" style={{ fontSize: "14px" }}>
                      Label
                    </label>
                    <Input
                      id="label"
                      placeholder="Label"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="hostname" style={{ fontSize: "14px" }}>
                      Hostname
                    </label>
                    <Input
                      id="hostname"
                      placeholder="Hostname"
                      value={hostname}
                      onChange={(e) => setHostname(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    columnGap: "12px",
                    marginTop: "14px",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  }}
                >
                  <SSHKeySelect sshKeys={sshKeys} setSSHKeys={setSSHKeys} />

                  <FirewallGroupSelect
                    firewallGroup={firewallGroup}
                    setFirewallGroup={setFirewallGroup}
                  />
                </div>

                <footer
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    width: "100%",
                    position: "sticky",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    zIndex: 40,
                    padding: "16px 20px",
                    borderTop: "1px solid #e5e5e5",
                    boxShadow: "0 -1px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div>
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        fontSize: "14px",
                        color: "#a3a3a3",
                      }}
                    >
                      Summary
                    </p>
                    <h2
                      style={{
                        padding: 0,
                        margin: 0,
                        marginTop: "2px",
                        fontSize: "24px",
                        color: "var(--primary-color)",
                      }}
                    >
                      {formatPrice(plan?.hourlyCost)}/hour{" "}
                      <span style={{ fontSize: "12px", color: "gray" }}>
                        ({formatPrice(plan?.monthlyCost)}/month)
                      </span>
                    </h2>
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleCreateInstance}
                    loading={isLoading}
                  >
                    Create Instance
                  </Button>
                </footer>
              </PageContent>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DeployInstance;

const PageContent = styled.div`
  .grid-layout {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    @media (min-width: 640px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (min-width: 768px) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .grid-item {
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 10px;
      width: full;
      padding: 16px 8px;
      border-radius: 7px;
      border: 1px solid #d1d5db;
      cursor: pointer;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      transition-property: color, background-color, border-color;
      text-decoration-color; fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;

      .content {
        font-weight: 500;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &.active {
        background: #bfdbfe;
        border-color: var(--primary-color);
      }
    }
  }
`;

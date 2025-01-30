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
import { formatPrice, toMonthlyPrice } from "../../utils/helpers";
import BackupsRadio from "./BackupsRadio";

const { Content } = Layout;

const DeployInstance = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    region: null,
    image: null,
    iso: null,
    plan: null,
    label: "",
    hostname: "",
    sshKeys: [],
    firewallGroup: "",
    backups: "enabled",
  });

  const [errors, setErrors] = useState({});

  const { data: plans } = useGetPlansQuery(formState.region);
  const [createInstance, { isLoading }] = useCreateInstanceMutation();

  const plan = useMemo(
    () => plans?.find((p) => p.plan === formState.plan),
    [plans, formState.plan]
  );

  const updateFormField = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleImageSelect = (value) => {
    setFormState((prev) => ({
      ...prev,
      image: value,
      iso: null,
    }));
    setErrors((prev) => ({
      ...prev,
      image: null,
      iso: null,
    }));
  };

  const handleISOSelect = (value) => {
    setFormState((prev) => ({
      ...prev,
      iso: value,
      image: null,
    }));
    setErrors((prev) => ({
      ...prev,
      image: null,
      iso: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formState.region) newErrors.region = "Region is required";
    if (!formState.plan) newErrors.plan = "Plan is required";
    if (!formState.hostname) newErrors.hostname = "Hostname is required";
    if (!formState.label) newErrors.label = "Label is required";
    if (!formState.image && !formState.iso)
      newErrors.image = "Either OS or ISO must be selected";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreateInstance = async () => {
    if (!validateForm()) {
      message.error("Please fill all the required fields!");
      return;
    }

    try {
      const { error, data } = await createInstance({
        label: formState.label,
        hostname: formState.hostname,
        region: formState.region,
        plan: formState.plan,
        os_id: formState.image,
        sshkey_id: formState.sshKeys,
        firewall_group_id: formState.firewallGroup,
        iso_id: formState.iso,
        backups: formState.backups,
      });

      if (error) {
        message.error(error.data.message || "Failed to create instance!");
        return;
      }

      navigate(`/instance/${data.id}`);
      notification.success({
        message: "Instance created successfully!",
        description: "Your instance will be ready within 3 to 5 minutes",
      });
    } catch {
      message.error("Failed to create instance!");
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
                  value={formState.region}
                  onValueChange={(val) => updateFormField("region", val)}
                  error={errors.region}
                />

                <Tabs
                  style={{ marginTop: "20px" }}
                  items={[
                    {
                      label: "Operating System",
                      key: "os",
                      children: (
                        <ImageSelect
                          value={formState.image}
                          onValueChange={handleImageSelect}
                          error={errors.image}
                        />
                      ),
                    },
                    {
                      key: "iso",
                      label: "ISO",
                      children: (
                        <ISOSelect
                          value={formState.iso}
                          onValueChange={handleISOSelect}
                          error={errors.image}
                        />
                      ),
                    },
                  ]}
                />

                <PlansSelect
                  value={formState.plan}
                  onValueChange={(val) => updateFormField("plan", val)}
                  region={formState.region}
                  error={errors.plan}
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
                      value={formState.label}
                      onChange={(e) => updateFormField("label", e.target.value)}
                      status={errors.label ? "error" : ""}
                    />
                    {errors.label && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.label}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="hostname" style={{ fontSize: "14px" }}>
                      Hostname
                    </label>
                    <Input
                      id="hostname"
                      placeholder="Hostname"
                      value={formState.hostname}
                      onChange={(e) =>
                        updateFormField("hostname", e.target.value)
                      }
                      status={errors.hostname ? "error" : ""}
                    />
                    {errors.hostname && (
                      <div
                        style={{
                          color: "red",
                          fontSize: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {errors.hostname}
                      </div>
                    )}
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
                  <SSHKeySelect
                    sshKeys={formState.sshKeys}
                    setSSHKeys={(val) => updateFormField("sshKeys", val)}
                  />

                  <FirewallGroupSelect
                    firewallGroup={formState.firewallGroup}
                    setFirewallGroup={(val) =>
                      updateFormField("firewallGroup", val)
                    }
                  />
                </div>

                <BackupsRadio
                  value={formState.backups}
                  plan={plan}
                  onValueChange={(val) => updateFormField("backups", val)}
                />

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
                      {formatPrice(
                        Number(plan?.monthlyCost) +
                          (formState.backups === "enabled"
                            ? toMonthlyPrice(plan?.backupCost)
                            : 0)
                      )}
                      /month{" "}
                      <sub style={{ fontSize: "12px", color: "gray" }}>
                        (
                        {formatPrice(
                          Number(plan?.hourlyCost) +
                            (formState.backups === "enabled"
                              ? Number(plan?.backupCost)
                              : 0)
                        )}
                        /hour)
                      </sub>
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

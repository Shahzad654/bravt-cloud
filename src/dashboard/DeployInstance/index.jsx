import { useState } from "react";
import styled from "styled-components";
import { Breadcrumb, Button, Input, Layout, message, Spin } from "antd";
import DashHeader from "../../components/DashHeader";
import ImageSelect from "./ImageSelect";
import PlansSelect from "./PlansSelect";
import RegionsSelect from "./RegionsSelect";
import { api } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const DeployInstance = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isPending, setIsPending] = useState();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [label, setLabel] = useState("");
  const [hostname, setHostname] = useState("");

  const handleCreateInstance = async () => {
    if (step === 0) {
      if (!selectedPlan || !selectedRegion) {
        message.error("Please fill all the required fields!");
        return;
      } else {
        setStep(1);
        return;
      }
    }

    if (!selectedPlan || !selectedRegion || !hostname || !label) {
      message.error("Please fill all the required fields!");
      return;
    }

    setIsPending(true);

    try {
      const response = await api.post("/vultr/createInstance", {
        label,
        hostname,
        region: selectedRegion,
        plan: selectedPlan,
        os_id: selectedImage,
      });
      message.success("Instance created successfully!");
      const newInstance = response.data.data.instance;
      navigate(`/instance/${newInstance.id}`);
    } catch (error) {
      message.error(error.response?.data.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      {isPending && (
        <Spin
          size="large"
          spinning
          percent="auto"
          fullscreen
          tip="Creating instance..."
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
                padding: 24,
                minHeight: 360,
                background: "white",
                borderRadius: "8px",
              }}
            >
              <PageContent>
                {step === 0 ? (
                  <>
                    <RegionsSelect
                      value={selectedRegion}
                      onValueChange={setSelectedRegion}
                    />

                    <PlansSelect
                      value={selectedPlan}
                      onValueChange={setSelectedPlan}
                      region={selectedRegion}
                    />
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: "grid",
                        columnGap: "12px",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      }}
                    >
                      <div>
                        <label htmlFor="label" style={{ fontSize: "14px" }}>
                          Label
                        </label>
                        <Input
                          autoFocus
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

                    <ImageSelect
                      value={selectedImage}
                      onValueChange={setSelectedImage}
                    />
                  </>
                )}

                <Footer>
                  <div
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    }}
                  >
                    <Step
                      className={`${step === 0 ? "active" : ""}`}
                      onClick={() => setStep(0)}
                    >
                      <span>Step 1: Location & Plan</span>
                      <span style={{ fontSize: "14px" }}>
                        Configure hardware
                      </span>
                    </Step>
                    <Step
                      className={`${step === 1 ? "active" : !selectedRegion || !selectedPlan ? "disabled" : ""}`}
                      onClick={() => {
                        if (!selectedRegion || !selectedPlan) return;
                        setStep(1);
                      }}
                    >
                      <span>Step 2: Configure software & deploy instance</span>
                      <span style={{ fontSize: "14px" }}>
                        OS / Software / Deploy
                      </span>
                    </Step>
                  </div>

                  <Button
                    type="primary"
                    size="large"
                    onClick={handleCreateInstance}
                    disabled={!selectedPlan || !selectedRegion}
                    loading={isPending}
                  >
                    {step === 0 ? "Next Step" : "Create Instance"}
                  </Button>
                </Footer>
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

    @media (min-width: 1024px) {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }

    @media (min-width: 1280px) {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }

    .grid-item {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
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
        sub {
          color: #52525b;
          font-size: 10px;
        }
      }

      &.active {
        background: #bfdbfe;
        border-color: var(--primary-color);
      }
    }
  }
`;

const Footer = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #d1d5db;
  display: flex;
  align-items: center;
  z-index: 50;
  margin-top: 20px;
  background-color: white;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.05);
  column-gap: 16px;
`;

const Step = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  border-bottom: 10px solid #d1d5db;
  flex-shrink: 0;
  padding: 12px 16px;
  cursor: pointer;
  transition-property: color, background-color, border-color;
  text-decoration-color; fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;

  &.active {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }

  &.disabled {
    cursor: not-allowed;
  }

  span {
    white-space: pre-wrap;
  }
`;

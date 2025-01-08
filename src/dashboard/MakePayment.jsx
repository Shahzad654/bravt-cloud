import { useMemo, useState } from "react";
import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import { Segmented } from "antd";
import { Flex } from "antd";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";
import PaymentForm from "./PaymentForm";
import Paypal from "./Paypal";

const { Content } = Layout;

const MakePayment = () => {
  const [value, setValue] = useState("$10");
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  const credits = useMemo(() => {
    return parseInt(value.replace("$", "") || "10", 10);
  }, [value]);

  return (
    <LayoutWrapper>
      <Layout style={{ backgroundColor: "white" }}>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{
              margin: "16px 0",
              fontSize: "var(--m-heading)",
              color: "black",
              fontWeight: "500",
            }}
          />

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: "white",
              borderRadius: "8px",
            }}
          >
            <PageContent>
              <CustomSegmented
                options={["$10", "$25", "$50", "$100", "$200"]}
                value={value}
                onChange={setValue}
              />

              <Flex gap={12} style={{ width: "100%" }}>
                <PaymentMethodCard
                  selected={paymentMethod === "stripe"}
                  onClick={() => setPaymentMethod("stripe")}
                >
                  <BsCreditCard2FrontFill size={20} />
                  Credit card
                </PaymentMethodCard>

                <PaymentMethodCard
                  selected={paymentMethod === "paypal"}
                  onClick={() => setPaymentMethod("paypal")}
                >
                  <FaPaypal size={20} />
                  Paypal
                </PaymentMethodCard>
              </Flex>

              {paymentMethod === "stripe" ? (
                <PaymentForm credits={credits} />
              ) : (
                <Paypal credits={credits} />
              )}
            </PageContent>
          </div>
        </Content>
      </Layout>
    </LayoutWrapper>
  );
};

export default MakePayment;

const CustomSegmented = styled(Segmented)`
  .ant-segmented {
    height: 60px;
    line-height: 60px;
    font-size: 18px;
  }

  .ant-segmented-item {
    padding: 0 30px;
  }

  .ant-segmented-item-selected {
    background-color: var(--primary-color) !important;
    color: white !important;
  }
`;

const LayoutWrapper = styled(Layout)`
  min-height: 100vh;

  @media (max-width: 768px) {
    min-height: 60vh;
  }
`;

const PageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PaymentMethodCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  border: 2px solid gray;
  cursor: pointer;
  font-size: 16px;

  ${(props) =>
    props.selected &&
    `
    border-color: var(--primary-color);
    color: var(--primary-color);
    background-color: #f0f9ff;
  `}
`;

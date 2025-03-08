import { useState } from "react";
import styled from "styled-components";
import { Breadcrumb, Button, Layout, Input } from "antd";
import { Flex } from "antd";
import { BsCreditCard2FrontFill, BsCurrencyDollar } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";
import PaymentForm from "./PaymentForm";
import Paypal from "./Paypal";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const { Content } = Layout;

const MakePayment = () => {
  const [value, setValue] = useState(10);
  const [customValue, setCustomValue] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [error, setError] = useState("");

  const handleCustomValueChange = (e) => {
    const inputValue = e.target.value;
    setCustomValue(inputValue);

    if (inputValue === "") {
      setError("");
      return;
    }

    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      setError("Please enter a valid number");
    } else if (numValue < 10) {
      setError("Minimum amount is $10");
    } else {
      setError("");
      setValue(numValue);
    }
  };

  const handlePresetValue = (val) => {
    setValue(val);
    setCustomValue("");
    setError("");
  };

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
              <Flex gap={8} wrap="wrap">
                {[10, 25, 50, 100, 200].map((val) => (
                  <Button
                    key={val}
                    type={value === val && !customValue ? "primary" : "default"}
                    onClick={() => handlePresetValue(val)}
                    style={{
                      minWidth: "80px",
                      height: "40px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    ${val}
                  </Button>
                ))}
                <CustomInputWrapper>
                  <Input
                    placeholder="Custom amount"
                    value={customValue}
                    size="small"
                    onChange={handleCustomValueChange}
                    style={{ width: "150px" }}
                    prefix={
                      <BsCurrencyDollar
                        size={14}
                        style={{ color: "#71717a" }}
                      />
                    }
                  />
                  {error && <ErrorText>{error}</ErrorText>}
                </CustomInputWrapper>
              </Flex>

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
                <PaymentForm credits={value} />
              ) : (
                <PayPalScriptProvider
                  options={{
                    clientId: process.env.REACT_APP_PAYPAL_PUBLIC_KEY,
                  }}
                >
                  <Paypal credits={value} />
                </PayPalScriptProvider>
              )}
            </PageContent>
          </div>
        </Content>
      </Layout>
    </LayoutWrapper>
  );
};

export default MakePayment;

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

const CustomInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 12px;
`;

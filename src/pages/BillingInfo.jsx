import { useState, useEffect } from "react";
import styled from "styled-components";
import LoginImg from "../assets/images/signup.jpg";
import { Form, Input, InputNumber, message, Select } from "antd";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import PhoneInput from "antd-phone-input";
import {
  useGetSessionQuery,
  useUpdateProfileMutation,
} from "../redux/apis/auth";

export default function BillingInfo() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);

  const { data } = useGetSessionQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(countryNames);
      } catch {
        message.error("Failed to load countries. Please refresh the page.");
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const phoneNumber = `+${values.phoneNumber.countryCode}${values.phoneNumber.areaCode}${values.phoneNumber.phoneNumber}`;
    const { error } = await updateProfile({ ...values, phoneNumber });

    if (error) {
      message.error(error.data.message);
      return;
    }

    navigate("/payment");
  };

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
  };

  const phoneNumberValidator = (_, { valid }) => {
    if (valid(true)) return Promise.resolve();
    return Promise.reject("Invalid phone number");
  };

  return (
    <Main>
      <Logo size={250} style={{ marginTop: "24px" }} />
      <StyledSignUp>
        <div className="form-container">
          <h3>Billing Information</h3>
          <div className="form-detail">
            <Form
              form={form}
              style={{ maxWidth: 600 }}
              initialValues={data}
              disabled={isLoading}
              {...formItemLayout}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input
                  style={{ marginLeft: "10px", width: "220px" }}
                  placeholder="Enter your first name"
                />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input
                  style={{ marginLeft: "10px", width: "220px" }}
                  placeholder="Enter your last name"
                />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              >
                <Input
                  style={{ marginLeft: "10px", width: "220px" }}
                  placeholder="Enter your address"
                />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter your city" }]}
              >
                <Input
                  style={{ marginLeft: "10px", width: "220px" }}
                  placeholder="Enter your city"
                />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: "Please select your country" },
                ]}
              >
                <Select
                  style={{ marginLeft: "10px", width: "220px" }}
                  placeholder="select your country"
                  showSearch
                  options={countries.map((country) => ({
                    label: country.name.common,
                    value: country.name.common,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="Zip Code"
                name="zipCode"
                rules={[
                  {
                    required: true,
                    message: "Please enter your zip code",
                  },
                ]}
              >
                <InputNumber
                  style={{ marginLeft: "10px", width: "220px" }}
                  placeholder="Enter your zip code"
                />
              </Form.Item>

              <Form.Item
                label="Company"
                name="companyName"
                rules={[
                  { required: true, message: "Please enter your company name" },
                ]}
              >
                <Input
                  style={{ marginLeft: "10px", width: "220px" }}
                  placeholder="Enter your company name"
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                    validator: phoneNumberValidator,
                  },
                ]}
              >
                <PhoneInput
                  enableSearch
                  style={{ marginLeft: "10px", width: "220px" }}
                  country={data.country}
                  onChange={(value) => value.phoneNumber}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  loading={isLoading}
                  className="btn"
                  style={{ minWidth: "250px", height: "36px", color: "white" }}
                >
                  {isLoading ? (
                    <CircularProgress size={16} style={{ color: "white" }} />
                  ) : (
                    "Submit"
                  )}
                </button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="image-container">
          <img src={LoginImg} alt="" />
        </div>
      </StyledSignUp>
    </Main>
  );
}

const Main = styled.div`
  background-color: var(--bg-color);
  height: 120vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    max-width: 200px;
    height: auto;
  }

  @media (max-width: 640px) {
    height: 100vh;
  }
`;

const StyledSignUp = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  border-radius: var(--l-radius);
  padding: 30px 30px;

  .form-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 2rem;
    .form-detail {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      span {
        color: var(--primary-color);
      }
      button {
        min-width: 250px;
      }
    }
  }

  .image-container {
    img {
      max-width: 500px;
      height: auto;
    }
  }

  @media (max-width: 640px) {
    width: 90%;
    margin: auto;
    .form-container {
      align-items: center;
    }
    .image-container {
      img {
        display: none;
      }
    }
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    width: 80%;
    margin: auto;
  }
`;

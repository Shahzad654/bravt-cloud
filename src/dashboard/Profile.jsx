import { useState, useEffect } from "react";
import styled from "styled-components";
import { Breadcrumb, Layout, message } from "antd";

import DashHeader from "../components/DashHeader";
import { Form, Input, InputNumber, Select } from "antd";
import {
  useGetSessionQuery,
  useUpdateProfileMutation,
} from "../redux/apis/auth";
import { CircularProgress } from "@mui/material";
import PhoneInput from "antd-phone-input";

const { Content } = Layout;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const Profile = () => {
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);

  const { data: user } = useGetSessionQuery();
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

    message.success("Profile updated");
  };

  const phoneNumberValidator = (_, { valid }) => {
    if (valid(true)) return Promise.resolve();
    return Promise.reject("Invalid phone number");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout style={{ backgroundColor: "white" }}>
        <DashHeader />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            style={{
              margin: "16px 0",
              fontSize: "var(--m-heading)",
              color: "black",
              fontWeight: "500",
            }}
          >
            Profile
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
              <div className="form">
                <Form
                  form={form}
                  style={{ maxWidth: 600 }}
                  initialValues={user}
                  disabled={isLoading}
                  {...formItemLayout}
                >
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your first name",
                      },
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
                      {
                        required: true,
                        message: "Please enter your last name",
                      },
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
                    rules={[
                      { required: true, message: "Please enter your city" },
                    ]}
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
                        label: country.name?.common,
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
                      {
                        required: true,
                        message: "Please enter your company name",
                      },
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
                      country={user.country}
                      onChange={(value) => value.phoneNumber}
                    />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      loading={isLoading}
                      className="btn"
                      style={{
                        minWidth: "250px",
                        height: "36px",
                        color: "white",
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress
                          size={16}
                          style={{ color: "white" }}
                        />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </Form.Item>
                </Form>
              </div>
            </PageContent>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Profile;

const PageContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .add-btn {
    min-width: 80px;
    padding: 6px 16px;
  }
`;

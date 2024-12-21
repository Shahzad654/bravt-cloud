import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { Button, Form, Input, InputNumber, Select } from "antd";
const { Content } = Layout;
const { Option } = Select;

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

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(countryNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <DashSidebar />
      <Layout style={{ padding: "0 16px", backgroundColor: "white" }}>
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
                <Form {...formItemLayout} form={form} style={{ maxWidth: 600 }}>
                  <Form.Item
                    label="First Name"
                    name="firstname"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input style={{ marginLeft: "10px", width: "220px" }} />
                  </Form.Item>

                  <Form.Item
                    label="Last Name"
                    name="lastname"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input style={{ marginLeft: "10px", width: "220px" }} />
                  </Form.Item>

                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input style={{ marginLeft: "10px", width: "220px" }} />
                  </Form.Item>

                  <Form.Item
                    label="City"
                    name="city"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input style={{ marginLeft: "10px", width: "220px" }} />
                  </Form.Item>

                  <Form.Item
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Select style={{ marginLeft: "10px", width: "220px" }}>
                      {countries.map((country) => (
                        <Option key={country} value={country}>
                          {country}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Zip Code"
                    name="zipcode"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <InputNumber
                      style={{ marginLeft: "10px", width: "220px" }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Company"
                    name="company"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <Input style={{ marginLeft: "10px", width: "220px" }} />
                  </Form.Item>

                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: "Please input!" }]}
                  >
                    <InputNumber
                      style={{ marginLeft: "10px", width: "220px" }}
                    />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 6,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Save Changes
                    </Button>
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

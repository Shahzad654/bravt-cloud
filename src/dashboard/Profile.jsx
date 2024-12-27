import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Breadcrumb, Layout } from "antd";
import DashSidebar from "../components/DashSidebar";
import DashHeader from "../components/DashHeader";
import { Button, Form, Input, InputNumber, Select } from "antd";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const { Content } = Layout;
const { Option } = Select;


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

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
  const userEmail = localStorage.getItem("email");
  const [modalEmail, setModalEmail] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    const email = localStorage.getItem("email");
    setModalEmail(email);
    setOpen(true); 
  };

  const handleClose = () => setOpen(false);
 
  console.log(userEmail)

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
    <>
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
                <div className="user_email" style={{ marginLeft:'1rem' }}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    readOnly
                    value={userEmail}
                    // placeholder="Enter your email"
                    style={{ marginLeft: '2.3rem', color:'gray' }}
                  />
                  <button className="small-btn" onClick={handleOpen}>Change</button>
                  
                </div>
                <br />
                
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Email
          </Typography>
          <Form style={{marginTop:'2rem'}}>
            <Form.Item
              label="Current Email"
              name="email"
              rules={[{ required: true, message: "Please input!" }]}
            >
            
                <Input
                  style={{ marginLeft: "9px", width: "180px" }}
                  readOnly
                  defaultValue={modalEmail} 
                />
                
         
            </Form.Item>

            <Form.Item
              label="Enter OTP"
              name="otp"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  style={{ marginLeft: "10px", width: "180px" }}
                  placeholder="Enter OTP"
                />
                <Button type="primary" style={{ marginLeft: "10px", minWidth: '30px' }}>
                  Get OTP
                </Button>
              </div>
            </Form.Item>
            <div style={{display:'flex', justifyContent:'center'}}>
              <Button type="primary" style={{ marginLeft: "10px", minWidth: '150px' }}>
                Submit
              </Button>

            </div>
           
          </Form>
        </Box>
      </Modal>

      </>
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

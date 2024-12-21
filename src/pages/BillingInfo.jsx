import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginImg from '../assets/images/signup.jpg';
import Logo from "../assets/images/nav.webp";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveBillingInfo } from "../redux/apis/billingInfo";
import { Snackbar, Alert } from '@mui/material'; // Import Snackbar and Alert from MUI

const { Option } = Select;

export default function BillingInfo() {
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

    const [form] = Form.useForm();
    const [countries, setCountries] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState('success');

    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

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

    const handleSubmit = async () => {
        const values = form.getFieldsValue();
        console.log("Form Submitted with Values:", values);

        // Dispatch the action
        dispatch(saveBillingInfo(values));

        // Check for error or success based on the Redux state
        if (error) {
            setSnackbarMessage('Error: ' + error.message);
            setSnackbarType('error');
        } else {
            setSnackbarMessage('Your billing information has been successfully submitted!');
            setSnackbarType('success');
        }

        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Main>
            <img src={Logo} alt="" />
            <StyledSignUp>
                <div className="form-container">
                    <h3>Add Information</h3>
                    <div className="form-detail">
                        <div className="form">
                            <Form {...formItemLayout} form={form} style={{ maxWidth: 600 }}>
                                <Form.Item
                                    label="First Name"
                                    name="firstname"
                                    rules={[{ required: true, message: "Please input!" }]} >
                                    <Input style={{ marginLeft: "10px", width: "220px" }} />
                                </Form.Item>

                                <Form.Item
                                    label="Last Name"
                                    name="lastname"
                                    rules={[{ required: true, message: "Please input!" }]} >
                                    <Input style={{ marginLeft: "10px", width: "220px" }} />
                                </Form.Item>

                                <Form.Item
                                    label="Address"
                                    name="address"
                                    rules={[{ required: true, message: "Please input!" }]} >
                                    <Input style={{ marginLeft: "10px", width: "220px" }} />
                                </Form.Item>

                                <Form.Item
                                    label="City"
                                    name="city"
                                    rules={[{ required: true, message: "Please input!" }]} >
                                    <Input style={{ marginLeft: "10px", width: "220px" }} />
                                </Form.Item>

                                <Form.Item
                                    label="Country"
                                    name="country"
                                    rules={[{ required: true, message: "Please input!" }]} >
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
                                    rules={[{ required: true, message: "Please input!" }]} >
                                    <InputNumber style={{ marginLeft: "10px", width: "220px" }} />
                                </Form.Item>

                                <Form.Item
                                    label="Company"
                                    name="company"
                                    rules={[{ required: true, message: "Please input!" }]} >
                                    <Input style={{ marginLeft: "10px", width: "220px" }} />
                                </Form.Item>

                                <Form.Item
                                    label="Phone"
                                    name="phone"
                                    rules={[{ required: true, message: "Please input!" }]} >
                                    <InputNumber style={{ marginLeft: "10px", width: "220px" }} />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                    <button
                                        type="primary"
                                        onClick={handleSubmit}
                                        loading={loading}>
                                        Submit
                                    </button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>

                <div className="image-container">
                    <img src={LoginImg} alt="" />
                </div>
            </StyledSignUp>

            {/* Snackbar for displaying success/error messages */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarType}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
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

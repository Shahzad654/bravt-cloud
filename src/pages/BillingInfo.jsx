import { useState, useEffect } from "react";
import styled from "styled-components";
import LoginImg from "../assets/images/signup.jpg";
import Logo from "../assets/images/nav.webp";
import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveBillingInfo } from "../redux/apis/billingInfo";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function BillingInfo() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [countries, setCountries] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Check for stored email on component mount
  useEffect(() => {
    if (!user.email) {
      setSnackbarMessage("Please sign up first");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      // Redirect to signup after a short delay
      setTimeout(() => navigate("/"), 2000);
    }
  }, [navigate, user]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryNames = data.map((country) => country.name.common).sort();
        setCountries(countryNames);
      } catch {
        setSnackbarMessage(
          "Failed to load countries. Please refresh the page."
        );
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async () => {
    try {
      // Validate form first
      await form.validateFields();

      setIsSubmitting(true);
      const values = form.getFieldsValue();

      // Add email to the form data
      const formDataWithEmail = {
        ...values,
        email: user.email,
      };

      await dispatch(saveBillingInfo(formDataWithEmail)).unwrap();

      setSnackbarMessage("Billing information saved successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Optional: Redirect to next page after successful submission
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setSnackbarMessage(
        error?.message || "Failed to save billing information"
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
  };

  return (
    <Main>
      <img src={Logo} alt="" />
      <StyledSignUp>
        <div className="form-container">
          <h3>Billing Information</h3>
          <div className="form-detail">
            <Form {...formItemLayout} form={form} style={{ maxWidth: 600 }}>
              <Form.Item
                label="First Name"
                name="firstname"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input style={{ marginLeft: "10px", width: "220px" }} />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastname"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input style={{ marginLeft: "10px", width: "220px" }} />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              >
                <Input style={{ marginLeft: "10px", width: "220px" }} />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please enter your city" }]}
              >
                <Input style={{ marginLeft: "10px", width: "220px" }} />
              </Form.Item>

              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: "Please select your country" },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Please enter your zip code",
                  },
                ]}
              >
                <InputNumber style={{ marginLeft: "10px", width: "220px" }} />
              </Form.Item>

              <Form.Item
                label="Company"
                name="company"
                rules={[
                  { required: true, message: "Please enter your company name" },
                ]}
              >
                <Input style={{ marginLeft: "10px", width: "220px" }} />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                ]}
              >
                <InputNumber style={{ marginLeft: "10px", width: "220px" }} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{ minWidth: "250px" }}
                >
                  {isSubmitting ? <Spin /> : "Submit"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        <div className="image-container">
          <img src={LoginImg} alt="" />
        </div>
      </StyledSignUp>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
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

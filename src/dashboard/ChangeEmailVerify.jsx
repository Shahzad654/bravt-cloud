import { useEffect } from "react"
import { Form, Input, Button, message } from "antd"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useChangeEmailMutation } from "../redux/apis/auth"
import DashHeader from "../components/DashHeader"

export default function ChangeEmailVerify() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get("email")
  const [form] = Form.useForm()

  useEffect(() => {
    if (!email) {
      message.error("No email provided")
      navigate("/change-email")
    }
  }, [email, navigate])

  const [changeEmail, { isLoading }] = useChangeEmailMutation()

  const handleSubmit = async (values) => {
    const { error } = await changeEmail({ ...values, email })
    if (error) {
      message.error(error.data.message)
      return
    }

    message.success("Email changed successfully")
    navigate("/instance")
  }

  if (!email) return null

  return (
    <>
      <DashHeader />

      <div style={{ maxWidth: 600, padding: "20px" }}>
        <h1>Verify Email</h1>
        <p style={{ whiteSpace: "normal" }}>
          Please enter the verification code sent to: {email}
        </p>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={isLoading}
          style={{ marginTop: "30px" }}
        >
          <Form.Item
            name="code"
            label="Verification Code"
            rules={[
              {
                required: true,
                message: "Please input the verification code!"
              },
              { len: 6, message: "Verification code must be 6 characters!" }
            ]}
          >
            <Input placeholder="Enter 6-digit code" maxLength={6} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Verify Code
            </Button>
          </Form.Item>

          <Button
            type="link"
            block
            onClick={() => navigate("/change-email")}
            disabled={isLoading}
          >
            Change Email
          </Button>
        </Form>
      </div>
    </>
  )
}

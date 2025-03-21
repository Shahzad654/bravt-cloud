import { Form, Input, Button, message } from "antd"
import { useNavigate } from "react-router-dom"
import {
  useChangeEmailRequestMutation,
  useGetSessionQuery
} from "../redux/apis/auth"
import DashHeader from "../components/DashHeader"

export default function ChangeEmailRequest() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { data: user } = useGetSessionQuery()
  const [changeEmail, { isLoading }] = useChangeEmailRequestMutation()

  const handleSubmit = async (values) => {
    const { error } = await changeEmail(values)
    if (error) {
      message.error(error.data.message)
      return
    }

    message.success("Verification code sent successfully")
    navigate(`/change-email/verify?email=${encodeURIComponent(values.email)}`)
  }

  return (
    <>
      <DashHeader />
      <div style={{ maxWidth: 600, padding: "20px" }}>
        <h3>Change Email</h3>
        <Form
          form={form}
          layout="vertical"
          disabled={isLoading}
          onFinish={handleSubmit}
          style={{ marginTop: "30px" }}
        >
          <Form.Item
            name="email"
            label="New Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
              () => ({
                validator(_, value) {
                  if (value && value === user?.email) {
                    return Promise.reject(
                      new Error(
                        "New email must be different from your current email!"
                      )
                    )
                  }
                  return Promise.resolve()
                }
              })
            ]}
          >
            <Input placeholder="Enter your new email" />
          </Form.Item>

          {user?.hasPassword && (
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
            >
              <Input type="password" placeholder="Enter your password" />
            </Form.Item>
          )}

          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit" block>
              Send Verification Code
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

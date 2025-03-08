import { Button, Form, message, Select, Space } from "antd";
import { useParams } from "react-router-dom";
import {
  useGetInstanceBackupScheduleQuery,
  useUpdateInstanceBackupScheduleMutation,
} from "../../redux/apis/instances";

const BackupScheduleForm = () => {
  const { instanceId } = useParams();
  const { data } = useGetInstanceBackupScheduleQuery(instanceId);

  const [form] = Form.useForm();

  const [updateSchedule, { isLoading }] =
    useUpdateInstanceBackupScheduleMutation();

  async function handleSubmit(values) {
    const { error } = await updateSchedule({ id: instanceId, ...values });
    if (error) {
      message.error(error.data.message || "Failed to update backup schedule");
      return;
    }

    message.success("Backup schedule updated!");
  }

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={isLoading}
      onFinish={handleSubmit}
      initialValues={{
        type: data.type || "weekly",
        hour: data.hour || 0,
        dow: data.dow || 1,
        dom: data.dom || 1,
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Form.Item
          label="Schedule Type"
          name="type"
          rules={[{ required: true }]}
        >
          <Select
            showSearch
            options={[
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "monthly", label: "Monthly" },
              { value: "daily_alt_even", label: "Alternate Even Days" },
              { value: "daily_alt_odd", label: "Alternate Odd Days" },
            ]}
          />
        </Form.Item>

        <Form.Item label="UTC Hour" name="hour" rules={[{ required: true }]}>
          <Select
            showSearch
            options={Array.from({ length: 24 }).map((_, index) => ({
              label: `${index}:00 UTC`,
              value: index,
            }))}
          />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prev, current) => prev.type !== current.type}
        >
          {() =>
            form.getFieldValue("type") === "weekly" ? (
              <Form.Item
                label="Day of Week"
                name="dow"
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { value: 1, label: "Sunday" },
                    { value: 2, label: "Monday" },
                    { value: 3, label: "Tuesday" },
                    { value: 4, label: "Wednesday" },
                    { value: 5, label: "Thursday" },
                    { value: 6, label: "Friday" },
                    { value: 7, label: "Saturday" },
                  ]}
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prev, current) => prev.type !== current.type}
        >
          {() =>
            form.getFieldValue("type") === "monthly" ? (
              <Form.Item
                label="Day of Month"
                name="dom"
                rules={[{ required: true }]}
                initialValue={new Date().getDay()}
              >
                <Select
                  showSearch
                  options={Array.from({ length: 29 }).map((_, index) => ({
                    label: `Day ${index + 1}`,
                    value: index + 1,
                  }))}
                />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item noStyle>
          <Button
            htmlType="submit"
            type="primary"
            loading={isLoading}
            className="w-full text-white bg-primary h-11 text-[15px]"
          >
            Save
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default BackupScheduleForm;

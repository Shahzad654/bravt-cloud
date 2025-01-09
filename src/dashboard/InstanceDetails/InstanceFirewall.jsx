import { Link, useParams } from "react-router-dom";
import {
  useGetFirewallGroupsQuery,
  useGetInstanceByIdQuery,
  useUpdateInstanceMutation,
} from "../../redux/apis/apiSlice";
import { useMemo } from "react";
import { Form, Button, message, Select, notification } from "antd";

const InstanceFirewall = () => {
  const { instanceId } = useParams();
  const { data: instance } = useGetInstanceByIdQuery(instanceId);

  const [form] = Form.useForm();
  const [updateInstance, { isLoading }] = useUpdateInstanceMutation();

  const { data: firewallGroups, status } = useGetFirewallGroupsQuery();

  const options = useMemo(() => {
    return (
      firewallGroups?.map((firewall) => ({
        value: firewall.id,
        label: firewall.description,
      })) || []
    );
  }, [firewallGroups]);

  const onFinish = async ({ firewall_group_id }) => {
    const { error } = await updateInstance({
      id: instanceId,
      firewall_group_id: firewall_group_id || null,
    });
    if (error) {
      message.error(error.message || "Failed to update firewall!");
    } else {
      notification.success({
        message: "Instance firewall updated!",
        description: "It may take over 2 minutes for these changes to apply!",
      });
    }
  };

  return (
    <div className="space-y-4 max-w-[600px] w-full">
      <h1 className="text-2xl font-semibold">
        Firewall{" "}
        <Link to="/firewall" className="text-base font-medium text-primary">
          (Manage)
        </Link>
      </h1>

      <Form
        form={form}
        onFinish={onFinish}
        disabled={isLoading}
        layout="vertical"
        initialValues={{ firewall_group_id: instance.firewall_group_id }}
      >
        <Form.Item name="firewall_group_id" label="Firewall Group">
          <Select
            showSearch
            disabled={isLoading || status === "pending"}
            loading={status === "pending"}
            rootClassName="[&_span]:text-sm"
            options={options}
            placeholder="Select firewall group"
            optionFilterProp="label"
            allowClear
            onClear={() => form.setFieldValue({ firewall_group_id: null })}
            labelRender={(val) =>
              status === "pending" ? "Loading..." : val.label
            }
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="btn h-9 flex items-center justify-center gap-2 w-full"
            loading={isLoading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InstanceFirewall;

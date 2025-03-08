import { useParams } from "react-router-dom";
import { Button, Form, message, Select } from "antd";
import { useMemo } from "react";
import { formatPrice } from "../../utils/helpers";
import {
  useGetInstanceByIdQuery,
  useGetInstanceAvailableUpgradesQuery,
  useUpdateInstanceMutation,
} from "../../redux/apis/instances";

const ChangePlan = () => {
  const { instanceId } = useParams();
  const { data: instance } = useGetInstanceByIdQuery(instanceId);
  const [form] = Form.useForm();
  const [updateInstance, { isLoading }] = useUpdateInstanceMutation();

  const { status, data: upgrades } =
    useGetInstanceAvailableUpgradesQuery(instanceId);

  const options = useMemo(() => {
    return upgrades?.plans.map((plan) => ({
      value: plan.plan,
      label: plan.plan,
      cost: formatPrice(plan.hourlyCost),
    }));
  }, [upgrades?.plans]);

  const onFinish = async ({ plan }) => {
    const { error } = await updateInstance({ id: instanceId, plan });
    if (error) {
      message.error(error.data.message || "Failed to update plan!");
    } else {
      message.success("Plan updated successfully!");
    }
  };

  return (
    <div className="space-y-4 max-w-[600px] w-full">
      <h1 className="text-2xl font-semibold">Current Plan</h1>

      <p className="text-sm text-zinc-500">
        Regular Cloud Compute
        <br />
        <strong>
          {instance.vcpu_count} vCPU{instance.vcpu_count > 1 ? "s" : ""},{" "}
          {instance.ram} MB RAM, {instance.disk.toFixed(2)} GB SSD
        </strong>
      </p>

      <h1 className="text-2xl font-semibold">Change Plan</h1>

      <Form
        form={form}
        onFinish={onFinish}
        disabled={isLoading}
        layout="vertical"
      >
        <Form.Item name="plan" label="Plan" rules={[{ required: true }]}>
          <Select
            showSearch
            disabled={isLoading || status === "pending"}
            loading={status === "pending"}
            rootClassName="[&_span]:text-sm"
            placeholder="Select a plan"
            options={options}
            optionRender={(opt) => {
              return (
                <div
                  key={opt.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{opt.value}</span>
                  <span>{opt.data.cost}/hr</span>
                </div>
              );
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="flex items-center justify-center w-full gap-2 btn h-9"
            loading={isLoading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePlan;

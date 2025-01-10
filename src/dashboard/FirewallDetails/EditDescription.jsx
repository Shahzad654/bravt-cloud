import { Card, message } from "antd";
import { useParams } from "react-router-dom";
import {
  useGetFirewallRulesQuery,
  useUpdateFirewallGroupMutation,
} from "../../redux/apis/apiSlice";
import { TbCheck, TbEdit, TbX } from "react-icons/tb";
import { useRef, useState } from "react";

const EditDescription = () => {
  const { firewallId } = useParams();
  const { data } = useGetFirewallRulesQuery(firewallId);

  const inputRef = useRef(null);

  const [isEditMode, setIsEditMode] = useState(false);

  const [updateFirewall, { isLoading }] = useUpdateFirewallGroupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = inputRef.current?.value;
    if (!description) {
      inputRef.current?.focus();
      return;
    }

    const { error } = await updateFirewall({
      groupID: firewallId,
      description,
    });

    setIsEditMode(false);

    if (error) {
      message.error(error.message || "Failed to update firewall");
    }
  };

  return (
    <Card
      hoverable
      className="border"
      onClick={() => {
        setIsEditMode(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-sm text-zinc-500">Description</p>
          {isEditMode ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <input
                ref={inputRef}
                disabled={isLoading}
                className="w-full !pb-0.5 px-0 h-7 border-b bg-transparent border-zinc-400 focus-visible:border-primary transition-[colors,opacity] rounded-none disabled:opacity-60"
              />

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  aria-label="Update"
                  disabled={isLoading}
                  className="text-emerald-600 transition-opacity aspect-square disabled:opacity-60"
                >
                  <TbCheck size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Cancel"
                  disabled={isLoading}
                  className="text-red-600 transition-opacity aspect-square disabled:opacity-60"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditMode(false);
                    if (inputRef.current) {
                      inputRef.current.value = "";
                    }
                  }}
                >
                  <TbX size={20} />
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-lg font-medium text-primary">
              {data.firewallGroup.description}
            </h1>
          )}
        </div>

        {!isEditMode && <TbEdit size={18} />}
      </div>
    </Card>
  );
};

export default EditDescription;

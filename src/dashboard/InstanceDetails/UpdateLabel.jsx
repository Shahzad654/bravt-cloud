import { useEffect, useRef, useState } from "react";
import {
  useGetInstanceByIdQuery,
  useUpdateInstanceMutation,
} from "../../redux/apis/instances";
import { cn } from "../../utils/helpers";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { TbCheck, TbX } from "react-icons/tb";

const UpdateLabel = ({ size = "sm" }) => {
  const [isInputMode, setIsInputMode] = useState(false);
  const inputRef = useRef(null);

  const [updateLabel, { isLoading }] = useUpdateInstanceMutation();

  const { instanceId } = useParams();
  const { data } = useGetInstanceByIdQuery(instanceId);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!isInputMode) {
    return (
      <button
        disabled={isLoading}
        onClick={() => {
          setIsInputMode(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className={cn(
          "hover:text-primary transition-colors",
          size === "lg" ? "text-3xl font-medium" : "text-sm"
        )}
      >
        {data.label || "Server Information"}
      </button>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const value = inputRef.current?.value?.trim();
    if (!value) {
      inputRef.current?.focus();
      return;
    }

    const { error } = await updateLabel({ id: instanceId, label: value });

    if (inputRef.current) inputRef.current.value = "";
    setIsInputMode(false);

    if (error) {
      message.error(error.data.message || "Failed to update label!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        ref={inputRef}
        disabled={isLoading}
        className={cn(
          "w-full !pb-0.5 px-0 border-b bg-transparent border-zinc-400 focus-visible:border-primary transition-[colors,opacity] rounded-none disabled:opacity-60",
          size === "sm"
            ? "max-w-[300px] text-sm h-[22px]"
            : "max-w-[400px] text-2xl h-9"
        )}
      />

      <button
        type="submit"
        aria-label="Update"
        disabled={isLoading}
        className="transition-opacity text-emerald-600 aspect-square disabled:opacity-60"
      >
        <TbCheck size={size === "sm" ? 14 : 20} />
      </button>
      <button
        type="button"
        aria-label="Cancel"
        disabled={isLoading}
        className="text-red-600 transition-opacity aspect-square disabled:opacity-60"
        onClick={() => {
          setIsInputMode(false);
          if (inputRef.current) inputRef.current.value = "";
        }}
      >
        <TbX size={size === "sm" ? 14 : 20} />
      </button>
    </form>
  );
};

export default UpdateLabel;

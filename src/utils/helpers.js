import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatPrice(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export function toSentenceCase(str) {
  return str
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, " ")
    .trim();
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isInstanceInstalling(instance) {
  if (
    instance?.server_status !== "ok" ||
    instance?.status !== "active" ||
    !["running", "stopped"].includes(instance?.power_status)
  ) {
    return true;
  } else {
    return false;
  }
}

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

export function customSort(array, key) {
  return array.sort((a, b) => {
    const aValue = a[key]?.toString().toLowerCase() || "";
    const bValue = b[key]?.toString().toLowerCase() || "";

    const aStartsWithU = aValue.startsWith("u");
    const bStartsWithU = bValue.startsWith("u");

    if (aStartsWithU && !bStartsWithU) return -1;
    if (!aStartsWithU && bStartsWithU) return 1;

    return aValue.localeCompare(bValue);
  });
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

import { clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function formatPrice(amount) {
  if (!amount) return "";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });

  return formatter.format(amount);
}

export function toSentenceCase(str) {
  return str
    .replace(/_/g, " ")
    .replace(/-/g, " ")
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
    !(
      instance?.server_status === "ok" ||
      instance?.server_status === "installingbooting"
    ) ||
    instance?.status !== "active" ||
    !["running", "stopped"].includes(instance?.power_status)
  ) {
    return true;
  } else {
    return false;
  }
}

export function sortByCharacterPriority(data, nameKey, char) {
  if (!data) return [];

  const dataCopy = [...data];

  return dataCopy?.sort((a, b) => {
    const nameA = a[nameKey].toLowerCase();
    const nameB = b[nameKey].toLowerCase();

    const startsWithA = nameA.startsWith(char);
    const startsWithB = nameB.startsWith(char);

    if (startsWithA && !startsWithB) {
      return -1;
    } else if (!startsWithA && startsWithB) {
      return 1;
    } else {
      return nameA.localeCompare(nameB);
    }
  });
}

export function formatDate(date) {
  return format(new Date(date), "PP");
}

export function getCountryName(countryCode) {
  const regions = new Intl.DisplayNames(["en"], { type: "region" });
  return regions.of(countryCode);
}

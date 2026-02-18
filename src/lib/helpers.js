import { CURRENCY } from "./constants";

export function formatPrice(price) {
  return `${CURRENCY}${price.toLocaleString("en-IN")}`;
}

export function getDiscount(original, current) {
  return Math.round(((original - current) / original) * 100);
}

export function truncate(str, length = 100) {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(num) {
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function getStarArray(rating) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return { full, hasHalf, empty };
}

export function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

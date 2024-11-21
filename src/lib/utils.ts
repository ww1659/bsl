import { clsx, type ClassValue } from "clsx"
import { addDays, format } from "date-fns";
import { twMerge } from "tailwind-merge"

export type OrderItem = {
  id: number | null;
  itemName: string | null;
  price: number | null;
  quantity: number | null;
  picked: boolean | null;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatName (name: string) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export function toTitleCase(input: string) {
  if (!input) return '';

  return input
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function toSentenceCase(input: string) {
  if (!input) return '';
  return input
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s*\w)/g, (match) => match.toUpperCase());
}

export function removeDashes(input: string) {
  return input.replace(/-/g, ' ');
}

export function getStartOfWeek (date: Date, display?: boolean) {
  const d = new Date(date);
  const day = d.getDay(); 
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return display 
  ? format (new Date(d.setDate(diff)).toISOString().split("T")[0], 'eee dd-MMM')
  : new Date(d.setDate(diff)).toISOString().split("T")[0]
};

export function getEndOfWeek (date: Date, display?: boolean) {
  const startOfWeek = getStartOfWeek(date);
  const endOfWeek = new Date(new Date(startOfWeek).setDate(new Date(startOfWeek).getDate() + 6));
  return display 
  ?  format(endOfWeek.toISOString(), 'eee dd-MMM')
  :  endOfWeek.toISOString().split("T")[0]
};

export function getWeekRange (date = new Date()) {
  const dayOfWeek = date.getDay();
  const differenceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const dateFrom = new Date(date);
  dateFrom.setDate(date.getDate() + differenceToMonday);
  const dateTo = addDays(dateFrom, 6);
  return { dateFrom, dateTo };
};

export function calculateOrderPickedStatus (items: OrderItem[]) {
  const allPicked = items.every((item) => item.picked === true);
  const nonePicked = items.every((item) => item.picked === false);
  if (allPicked) return "picked";
  if (!nonePicked) return "partial";
  return "not picked";
};


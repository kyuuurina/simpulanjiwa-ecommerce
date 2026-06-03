import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMYR(amount: number): string {
  if (amount == null || isNaN(amount)) return "RM 0.00";
  return `RM ${amount.toFixed(2)}`;
}

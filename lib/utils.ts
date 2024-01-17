import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNameAcronym(fName: string, lName: string): string {
  return fName?.charAt(0)?.toUpperCase() + lName?.charAt(0)?.toUpperCase();
}

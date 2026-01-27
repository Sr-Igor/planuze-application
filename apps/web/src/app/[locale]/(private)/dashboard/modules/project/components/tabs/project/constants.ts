import { BadgeVariant } from "@repo/ui";

export const variants: Record<string, BadgeVariant> = {
  active: "default",
  completed: "default",
  late: "destructive",
  on_schedule: "secondary",
} as const;

export const colors: Record<string, string> = {
  active: "bg-blue-500",
  completed: "bg-green-500",
  late: "bg-red-500",
  on_schedule: "bg-yellow-500",
};

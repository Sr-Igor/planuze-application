import { cn } from "@repo/ui";

export const avatarItem = cn(`flex items-center gap-2`, `text-sm`, `text-muted-foreground`);

export const header = cn(
  `bg-sidebar`,
  `absolute`,
  `flex`,
  `h-16`,
  `w-full`,
  `items-center`,
  "gap-2", // `justify-between`,
  `pr-5`,
  `z-1`
);

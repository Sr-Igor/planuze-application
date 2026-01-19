import { ScrollArea } from "@repo/ui";

import { cn } from "@repo/ui";

interface ScrollColumnProps {
  children: React.ReactNode;
  className?: string;
}
export const scrollClass = " h-[calc(100vh-450px)] pr-4 pb-2 md:h-[calc(100vh-415px)]";

export const ScrollColumn = ({ children, className }: ScrollColumnProps) => {
  return <ScrollArea className={cn(scrollClass, className)}>{children}</ScrollArea>;
};

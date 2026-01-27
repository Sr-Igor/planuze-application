import { Plus } from "lucide-react";

import { useUserAccess } from "@repo/redux/hooks";
import { Button, cn } from "@repo/ui";

export interface EmptyProps {
  visible: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  button?: {
    label: string;
    onClick: () => void;
  };
}

export const Empty = ({ visible, icon, title, description, button }: EmptyProps) => {
  const { permissions } = useUserAccess();
  const perm = permissions("project_kanban_cycle");

  return (
    <div
      className={cn(
        "border-border bg-background absolute top-0 left-0 z-30 mt-[20px] flex h-[calc(100%-40px)] w-full flex-1 flex-col items-center justify-center gap-4 overflow-hidden rounded-md border",
        "opacity-100",
        !visible && "pointer-events-none opacity-0 transition-opacity duration-300 ease-in-out"
      )}
    >
      {icon}
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-muted-foreground text-xl">{description}</p>
      {button && perm.store && (
        <Button onClick={() => button?.onClick()}>
          <Plus />
          {button?.label}
        </Button>
      )}
    </div>
  );
};

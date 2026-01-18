import { AlertCircleIcon } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Alert, AlertDescription, AlertTitle, Label, RadioGroup, RadioGroupItem } from "@repo/ui-new";

import { cn } from "@repo/ui-new";

export interface ICustomDeleteProps {
  Form?: React.ComponentType<any>;
  formProps?: any;
  hook?: any;
  options: {
    label: string;
    value: string;
    className?: string;
  }[];
  value: string;
  setValue: (value: string) => void;
  loading?: boolean;
  alert?: {
    variant?: "destructive" | "default";
    title?: string;
    description?: string;
  };
}

export const CustomDelete = ({
  Form = () => null,
  formProps = {},
  hook = {},
  options = [],
  value,
  setValue,
  loading,
  alert,
}: ICustomDeleteProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div className="flex flex-col gap-4">
      <Alert variant={alert?.variant || "destructive"}>
        <AlertCircleIcon />
        <AlertTitle>{alert?.title || t("delete.warning.title")}</AlertTitle>
        <AlertDescription>{alert?.description || t("delete.warning.description")}</AlertDescription>
      </Alert>
      <div className="flex flex-col gap-4">
        <RadioGroup value={value} onValueChange={setValue} disabled={loading}>
          {options.map((option) => {
            return (
              <Label
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-center gap-2 rounded-md border px-2 py-2 text-sm",
                  loading && "cursor-not-allowed opacity-50",
                  option.className
                )}
              >
                <RadioGroupItem value={option.value} className={option.className} />
                <span>{option.label}</span>
              </Label>
            );
          })}
        </RadioGroup>

        {value === "transfer" && (
          <Form
            {...formProps}
            hook={hook}
            className={cn("grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4", formProps.className)}
          />
        )}
      </div>
    </div>
  );
};

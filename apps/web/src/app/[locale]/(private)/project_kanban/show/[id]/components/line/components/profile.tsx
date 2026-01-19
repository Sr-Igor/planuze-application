import { useLang } from "@repo/language/hooks";
import { Label , AppAvatar } from "@repo/ui";

import { CheckboxSelect } from "@repo/form";

import { IProfile } from "../../../types";

export interface ProfileProps {
  value: any;
  setValue: (value: any) => void;
  options: { label: string; value: string }[];
  loading: boolean;
  profiles: IProfile[];
}

export const Profile = ({ value, setValue, options, loading, profiles }: ProfileProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <div>
      <Label className="light:text-gray-500 mb-2 flex items-center text-xs font-semibold dark:text-gray-400">
        {t(`component.line.responsible`)}
      </Label>
      <CheckboxSelect
        options={options || []}
        value={value}
        className="text-foreground w-full xl:w-40"
        loading={loading}
        onChange={(value) => setValue(value)}
        optionChildren={(i) => {
          const item = profiles.find((profile) => profile.profile_id === i.value);
          return (
            <div className="flex w-full items-center gap-2 text-sm">
              {item && (
                <AppAvatar
                  src={item.avatar || ""}
                  path="user/avatar"
                  publicFile
                  name={item.name || ""}
                  className="h-4 w-4"
                  fallbackClassName="text-[10px]"
                />
              )}
              <p className="line-clamp-1 flex-1 truncate">{item?.name || i.label}</p>
            </div>
          );
        }}
      />
    </div>
  );
};

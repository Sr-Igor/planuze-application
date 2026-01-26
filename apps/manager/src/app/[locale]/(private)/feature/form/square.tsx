import { useLang } from "@repo/language/hooks";

export const Square = () => {
  const t = useLang();

  const infos = [
    {
      label: t.property("order"),
      info: t.feature("order_info"),
    },
    {
      label: t.property("group"),
      info: t.feature("group_info"),
    },
    {
      label: t.property("path"),
      info: t.feature("path_info"),
    },
    {
      label: t.property("reference"),
      info: t.feature("reference_info"),
    },
    {
      label: t.property("route"),
      info: t.feature("route_info", { path: t.property("path") }),
    },
    {
      label: t.property("plan_title"),
      info: t.feature("plan_title_info"),
    },
  ];

  return (
    <div className="border border-b p-4">
      {infos.map((info, index) => (
        <div key={index} className="flex items-center gap-2">
          <p className="text-[11px] font-semibold first-letter:uppercase">{info.label}: </p>
          <span className="text-muted-foreground text-[11px] font-medium">{info.info}</span>
        </div>
      ))}
    </div>
  );
};

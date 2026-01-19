import { Check, FileQuestion, X } from "lucide-react";

import { invite } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { TableColumn } from "@repo/ui";


export const useTable = () => {
  const t = useLang();

  const { dates } = useIntlFormat();

  const columns: TableColumn<invite>[] = [
    {
      title: t.property("email"),
      accessor: "email",
      sortable: true,
    },
    {
      title: t.property("accepted"),
      accessor: "accepted",
      sortable: true,
      centered: true,
      customRender: (item) => {
        switch (item.accepted) {
          case null:
            return (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                <FileQuestion className="h-5 w-5" />
              </div>
            );
          case true:
            return (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <Check className="h-5 w-5" />
              </div>
            );
          case false:
            return (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                <X className="h-5 w-5" />
              </div>
            );
        }
      },
    },
    {
      title: t.property("feedback_in"),
      accessor: "feedback_in",
      centered: true,
      sortable: true,
      customRender: (item) => {
        return item.feedback_in ? dates.format(new Date(item.feedback_in)) : "-";
      },
    },
    {
      title: t.property("createdAt"),
      accessor: "createdAt",
      centered: true,
      sortable: true,
      breakpoint: 720,
      width: 200,
      customRender: (item) => {
        return item.createdAt ? dates.format(new Date(item.createdAt)) : "-";
      },
    },
  ];

  return { columns };
};

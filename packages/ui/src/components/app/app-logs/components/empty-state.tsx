import { Clock3 } from "lucide-react";

import { useLang } from "@repo/language/hooks";

export const EmptyState = () => {
  const t = useLang();

  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <Clock3 size={48} className="mb-4 text-gray-400" />
      <p className="text-sm text-gray-500 dark:text-gray-400">{t.helper("empty_data")}</p>
    </div>
  );
};

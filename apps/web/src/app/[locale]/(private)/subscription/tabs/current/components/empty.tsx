import { useRouter } from "next/navigation";

import { Zap } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui-new";

export const Empty = () => {
  const t = useLang();
  const router = useRouter();

  return (
    <div className="flex h-full flex-col items-center justify-center py-12 text-center">
      <Zap className="mb-3 h-10 w-10 text-gray-400" />
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {t.page.subscription("empty.plan.title")}
      </h3>
      <p className="text-sm text-gray-500">{t.page.subscription("empty.plan.description")}</p>
      <Button variant="outline" className="mt-4" onClick={() => router.push("/plans")}>
        {t.page.subscription("empty.plan.button")}
      </Button>
    </div>
  );
};

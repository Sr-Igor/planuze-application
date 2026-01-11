import { ArrowRight } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Link } from "@repo/language/navigation";
import { Button } from "@repo/ui";

export const Cta = () => {
  const t = useLang();
  return (
    <section className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.page.lp("cta.title")}
          </h2>
          <p className="mb-8 text-lg opacity-90">{t.page.lp("cta.description")}</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/plans">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                {t.page.lp("cta.button")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm opacity-80">{t.page.lp("cta.trial")}</p>
        </div>
      </div>
    </section>
  );
};

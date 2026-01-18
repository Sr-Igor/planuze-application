import { ArrowRight, Play } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Link } from "@repo/language/navigation";
import { Button } from "@repo/ui";
import { AppClock } from "@repo/ui/app";

export const Hero = () => {
  const t = useLang();

  return (
    <section className="container mx-auto flex min-h-[calc(100vh-68px)] items-center justify-center px-4 py-20 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        {/* <AppLogo width={400} height={100} className='mx-auto mb-4' /> */}
        <AppClock width={250} height={100} className="mx-auto mb-4" />
        <h1 className="my-10 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {t.page.lp("hero.title")}
        </h1>
        <p className="text-muted-foreground mb-8 text-lg sm:text-xl">
          {t.page.lp("hero.description")}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/plans">
            <Button size="lg" className="w-full sm:w-auto">
              {t.page.lp("hero.cta_primary")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            <Play className="mr-2 h-4 w-4" />
            {t.page.lp("hero.cta_secondary")}
          </Button>
        </div>
        <p className="text-muted-foreground mt-6 text-sm">{t.page.lp("hero.trial")}</p>
      </div>
    </section>
  );
};

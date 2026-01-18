import { useLang } from "@repo/language/hooks";

export interface HowProps {
  steps: {
    number: string;
    title: string;
    description: string;
  }[];
}

export const How = ({ steps }: HowProps) => {
  const t = useLang();

  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.page.lp("steps.title")}
          </h2>
          <p className="text-muted-foreground text-lg">{t.page.lp("steps.description")}</p>
        </div>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary text-primary-foreground z-1 mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
                    {step.number}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="bg-border absolute top-8 right-0 hidden h-0.5 w-full translate-x-1/2 lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

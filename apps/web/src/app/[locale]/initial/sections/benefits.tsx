import { LucideIcon } from "lucide-react";

import { useLang } from "@repo/language/hook";

export interface BenefitsProps {
  benefits: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
}

export const Benefits = ({ benefits }: BenefitsProps) => {
  const t = useLang();
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {t.page.lp("benefits.title")}
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {t.page.lp("benefits.description")}
            </p>
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                      <Icon className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative">
            <div className="sticky top-24">
              <div className="bg-muted/50 relative overflow-hidden rounded-2xl border shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1000&fit=crop"
                  alt="Planuze Benefits"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

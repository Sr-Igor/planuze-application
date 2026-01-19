import { LucideIcon } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";

export interface FeatureProps {
  features: {
    icon: LucideIcon;
    title: string;
    description: string;
  }[];
}

export const Feature = ({ features }: FeatureProps) => {
  const t = useLang();

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {t.page.lp("features.title")}
        </h2>
        <p className="text-muted-foreground text-lg">{t.page.lp("features.description")}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="transition-all hover:shadow-lg">
              <CardHeader>
                <div className="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-lg">
                  <Icon className="text-primary h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

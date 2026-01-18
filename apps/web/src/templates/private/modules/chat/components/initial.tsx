import { user } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Badge } from "@repo/ui";

import { cn } from "@repo/ui";

export interface IInitialProps {
  user?: user | null;
  categories: string[];
  features: string[];
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Initial = ({ user, categories, features, setFeatures }: IInitialProps) => {
  const t = useLang();

  return (
    <div className="flex flex-1 flex-col items-center gap-2 p-4">
      <p className="mb-2">{t.chat("hello", { name: user?.name })}</p>
      <div className="flex w-full flex-col gap-2">
        <p className="mb-2 text-center">{t.chat("initial")}</p>
        <div className="flex w-full flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={features.includes(category) ? "default" : "outline"}
              onClick={() =>
                setFeatures((prev) =>
                  prev.includes(category) ? prev.filter((f) => f !== category) : [...prev, category]
                )
              }
              className={cn(
                "border-foreground cursor-pointer rounded-full border px-3 py-2 text-xs transition-all duration-300",
                features.includes(category)
                  ? "bg-primary text-primary-foreground border-primary/60 shadow"
                  : "bg-background hover:bg-primary/10 dark:hover:bg-primary/20 text-foreground"
              )}
            >
              {t.chat(`categories.${category}`)}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

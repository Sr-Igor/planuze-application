import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
  Skeleton,
} from "@repo/ui";

export interface IAppCardProps {
  title: React.ReactNode;
  description: React.ReactNode;
  content: React.ReactNode;
  contentClassName?: string;
  cardClassName?: string;
  footer?: React.ReactNode;
  loading?: boolean;
}

export const AppCard = ({
  title,
  description,
  content,
  footer,
  loading = false,
  contentClassName,
  cardClassName,
}: IAppCardProps) => {
  return (
    <Card className={cn("relative py-0", cardClassName)}>
      <Skeleton
        className={cn(
          "absolute h-full w-full",
          loading ? "pointer-events-none z-10 opacity-100" : "pointer-events-auto z-[-1] opacity-0"
        )}
      />

      <span
        className={cn(
          "flex flex-col gap-5 py-4",
          "transition-all duration-300 ease-in-out",
          loading ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
        )}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className={contentClassName}>{content}</CardContent>
        <CardFooter className="flex-col gap-2">{footer}</CardFooter>
      </span>
    </Card>
  );
};

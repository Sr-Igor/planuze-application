import * as icons from "lucide-react";

interface IconProps {
  name: any;
}

export const Icon = ({ name, ...props }: Omit<icons.LucideProps, "name"> & IconProps) => {
  //@ts-ignore
  const LucideIcon = icons?.[name] ?? icons.CircleHelp;
  return <LucideIcon {...props} />;
};

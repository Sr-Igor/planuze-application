import { Avatar, AvatarFallback } from "@repo/ui";

import { IImg, Img } from "@/components/image";
import { cn } from "@/lib/utils";

export interface IAppAvatarProps extends Omit<IImg, "alt" | "fill"> {
  name: string;
  fallbackClassName?: string;
}

export const AppAvatar = ({ name, className, fallbackClassName, ...rest }: IAppAvatarProps) => {
  return (
    <Avatar
      className={cn(
        "relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full",
        className
      )}
    >
      <Img
        {...rest}
        fill
        alt={name}
        fallback={
          <AvatarFallback className={cn("text-sm", fallbackClassName)}>
            {name?.charAt(0)}
          </AvatarFallback>
        }
      />
    </Avatar>
  );
};

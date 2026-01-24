import { cn } from "../../../shared/utils";
import { Avatar, AvatarFallback } from "../../primitives/avatar";
import { AppImage, IAppImage } from "../app-image";

export interface AppAvatarProps extends Omit<IAppImage, "alt" | "fill"> {
  name: string;
  fallbackClassName?: string;
}

export const AppAvatar = ({ name, className, fallbackClassName, ...rest }: AppAvatarProps) => {
  return (
    <Avatar
      className={cn(
        "relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full",
        className
      )}
    >
      <AppImage
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

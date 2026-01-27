import type { PropsWithChildren } from "react";

import { AppLogo, cn } from "@repo/ui";

import * as styles from "./styles";

interface CenterTemplateProps extends PropsWithChildren {
  hideLogo?: boolean;
  containerClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export const CenterTemplate = ({
  children,
  hideLogo,
  containerClassName,
  headerClassName,
  contentClassName,
}: CenterTemplateProps) => {
  return (
    <main className={cn(styles.container, containerClassName)}>
      <div className={cn(styles.header, headerClassName)}>
        {!hideLogo && <AppLogo width={400} height={100} />}
      </div>

      <div className={cn(styles.contentWrapper, contentClassName)}>{children}</div>
    </main>
  );
};

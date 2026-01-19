import type { PropsWithChildren } from "react";

import { AppLogo } from "@repo/ui";

import * as styles from "./styles";

interface CenterTemplateProps extends PropsWithChildren {
  hideLogo?: boolean;
}

export const CenterTemplate = ({ children, hideLogo }: CenterTemplateProps) => {
  return (
    <main className={styles.container}>
      <div className={styles.header}>{!hideLogo && <AppLogo width={400} height={100} />}</div>

      <div className={styles.contentWrapper}>{children}</div>
    </main>
  );
};

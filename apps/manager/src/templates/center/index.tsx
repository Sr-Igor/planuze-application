import type { PropsWithChildren } from "react";

import { useLang } from "@repo/language/hooks";
import { AppLogo } from "@repo/ui";

import * as styles from "./styles";

interface CenterTemplateProps extends PropsWithChildren {
  hideLogo?: boolean;
}

export const CenterTemplate = ({ children, hideLogo }: CenterTemplateProps) => {
  const t = useLang();

  return (
    <main className={styles.container}>
      <div className={styles.header}>{!hideLogo && <AppLogo width={400} height={100} />}</div>
      <p className="text-muted-foreground">{t.helper("admin_panel")}</p>

      <div className={styles.contentWrapper}>{children}</div>
    </main>
  );
};

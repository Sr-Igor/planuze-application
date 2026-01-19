import { useLang } from "@repo/language/hooks";
import { AppLogsModal } from "@repo/ui";

import { ILogsProps } from "../../type";

export const Logs = <T,>({ state, handleState, logs }: ILogsProps<T>) => {
  const t = useLang();

  return (
    <AppLogsModal
      open={!!state?.open && state?.mode === "logs"}
      onOpenChange={() => handleState({ open: false })}
      data={state?.item}
      logs={logs}
    />
  );
};

import { useLang } from "@repo/language/hook";
import { AppLogsModal } from "@repo/ui/app";

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

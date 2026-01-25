import { useState } from "react";

import { useLang } from "@repo/language/hooks";
import { invite } from "@repo/types";
import { AppDialog, AppInvite, Button } from "@repo/ui";

export interface IInviteProps {
  invites: invite[];
  onFeedback: (data: { id: string; accepted: boolean }) => void;
  loading: boolean;
}

export interface State {
  open?: boolean;
  mode: "accept" | "reject";
  item?: invite;
}

export const Invite = ({ invites, onFeedback, loading }: IInviteProps) => {
  const [state, setState] = useState<State>({
    open: false,
    mode: "accept",
    item: undefined,
  });

  const handleState = (updates: Partial<State>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const t = useLang();

  return (
    <div className="flex flex-col gap-2">
      {invites.map((invite) => (
        <AppInvite
          key={invite.id}
          invite={invite}
          loading={loading}
          onFeedback={(data) => handleState({ open: true, ...data })}
        />
      ))}

      <AppDialog
        open={state.open}
        onOpenChange={() => handleState({ open: false })}
        title={t.page.welcome(`modal.${state.mode}.title`)}
        description={t.page.welcome(`modal.${state.mode}.description`)}
        footer={
          <Button
            onClick={() => {
              if (state.item?.id) {
                onFeedback({ id: state.item?.id, accepted: state.mode === "accept" });
                handleState({ open: false });
              }
            }}
            loading={loading}
          >
            {t.page.welcome(`${state.mode}`)}
          </Button>
        }
      />
    </div>
  );
};

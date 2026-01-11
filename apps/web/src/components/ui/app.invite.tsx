import { differenceInDays } from "date-fns";
import { Check, X } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button, Card, CardContent, CardHeader, CardTitle, Skeleton } from "@repo/ui";

import { invite } from "@/api/generator/types";
import { AppAvatar } from "@/components/ui/app-avatar";
import { useIntlFormat } from "@/hooks/intl-format";

export interface IAppInviteProps {
  invite: invite;
  loading: boolean;
  onFeedback: (data: { item: invite; mode: "accept" | "reject" }) => void;
}

export const AppInvite = ({ invite, loading, onFeedback }: IAppInviteProps) => {
  const t = useLang();
  const { dates } = useIntlFormat();

  const isExpired = invite.expire_date
    ? differenceInDays(new Date(invite.expire_date), new Date()) < 0
    : false;

  return (
    <Card
      key={invite.id}
      className="relative flex h-18 flex-row justify-between gap-2 overflow-hidden p-0"
    >
      {loading && <Skeleton className="absolute h-full w-full" />}
      {!loading && (
        <>
          <CardHeader className="flex flex-row items-center gap-2">
            <AppAvatar
              name={invite.company?.name || ""}
              path="company/logo"
              src={invite.company?.logo || ""}
              publicFile={true}
              className="h-12 w-12"
            />
            <CardTitle>{invite.company?.name}</CardTitle>
          </CardHeader>
          <CardContent className="m-0 flex flex-row items-center gap-2">
            {invite.accepted === null && !isExpired && (
              <>
                <Button
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => onFeedback({ mode: "reject", item: invite })}
                >
                  <X strokeWidth={2} />
                </Button>
                <Button
                  className="bg-green-500 text-white hover:bg-green-600"
                  onClick={() => onFeedback({ mode: "accept", item: invite })}
                >
                  <Check strokeWidth={2} />
                </Button>
              </>
            )}
            {invite.accepted === null && isExpired && (
              <p className="text-sm text-red-500">{t.helper("expired")}</p>
            )}
            {invite.accepted !== null && (
              <div className="flex flex-col items-center gap-1">
                {invite.accepted === true && (
                  <p className="text-sm text-green-500">{t.helper("accepted")}</p>
                )}

                {invite.accepted === false && (
                  <p className="text-sm text-red-500">{t.helper("rejected")}</p>
                )}

                {invite.feedback_in && (
                  <p className="text-muted-foreground text-sm">
                    {dates.format(new Date(invite.feedback_in))}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};

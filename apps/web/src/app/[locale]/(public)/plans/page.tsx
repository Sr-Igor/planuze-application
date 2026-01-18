"use client";

import { useRouter } from "next/navigation";

import { Ban, UserLock } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@repo/ui";

import { usePlan } from "@repo/api/web/callers/plan";
import { useSubscription } from "@repo/api/web/callers/subscription";
import { useAccess } from "@/hooks/access";
import { useSignOut } from "@repo/cookies";
import { useAppDispatch } from "@repo/redux/hook";
import { set as setModule } from "@repo/redux/store/modules/module/actions";
import { PlansTemplate } from "@/templates/plans";
import { ProfileSwitcher } from "@/templates/private/components/profile-switch";

export default function Page() {
  const t = useLang();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { profile, verifyAccess, module, subscription } = useAccess();

  const isPublic = !subscription;

  const has = verifyAccess("subscription", "index");
  const enabled = (has.ok && module?.id === has.moduleId) || isPublic;

  const { index } = useSubscription({ enabledIndex: enabled });
  const { index: indexPlan } = usePlan({ company_id: profile?.company_id, enabled });

  const { out } = useSignOut();

  const subscriptions = index?.data?.data || [];
  const plans = indexPlan?.data?.data || [];
  const isLoading =
    index?.isPending ||
    indexPlan?.isPending ||
    index.isPlaceholderData ||
    indexPlan.isPlaceholderData;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-xl font-bold text-gray-900 md:text-3xl dark:text-white">
          {t.page.plans("title")}
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-gray-600 md:text-base dark:text-gray-300">
          {t.page.plans("description")}
        </p>
      </div>

      {(has.ok || isPublic) && (
        <PlansTemplate plans={plans} subscriptions={subscriptions} isLoading={isLoading} />
      )}

      {!has?.ok && !isPublic && (
        <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-5">
          <Ban size={108} className="text-destructive" />
          <h2 className="text-xl font-bold">{t.page.plans("no_permission.title")}</h2>
          <p className="text-sm font-semibold">{t.page.plans("no_permission.description")}</p>
        </div>
      )}

      <div className="mb-6 flex w-full flex-col items-center">
        {profile && (
          <div className="mt-5 flex items-center gap-4">
            <Button variant="destructive" className="min-w-[120px]" onClick={() => out("/plans")}>
              {t.helper("exit")}
            </Button>

            <ProfileSwitcher callbackUrl="/plans" />
          </div>
        )}
      </div>

      <Dialog open={has.ok && !enabled}>
        <DialogContent
          closeButton={false}
          className="flex flex-col items-center justify-center gap-5"
        >
          <DialogTitle className="flex items-center gap-4 text-lg font-bold">
            <UserLock size={40} />
            {t.page.plans("change_to_admin_title")}
          </DialogTitle>
          <DialogDescription className="text-sm font-semibold">
            {t.page.plans("change_to_admin_description")}
          </DialogDescription>

          <div className="flex gap-4">
            <DialogFooter>
              <Button variant="outline" onClick={() => router.back()}>
                {t.helper("back")}
              </Button>
            </DialogFooter>
            <DialogFooter>
              <Button
                onClick={() => {
                  dispatch(setModule({ moduleId: has.moduleId }));
                }}
              >
                {t.page.plans("change_to_admin")}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

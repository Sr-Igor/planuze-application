"use client";

import { useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { PlusCircle } from "lucide-react";

import { NotFoundGif } from "@repo/assets";
import { useClean } from "@repo/cookies";
import { useLang } from "@repo/language/hooks";
import { useAppDispatch, useAppSelector } from "@repo/redux/hooks";
import { update } from "@repo/redux/store/modules/modal/actions";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AppProfileSelect,
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContentInModal,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@repo/ui";

import { useAccess } from "@/hooks/access";

export const InactiveModal = () => {
  const t = useLang();

  const { profile } = useAccess();
  const dispatch = useAppDispatch();
  const { inactive: isModalOpen } = useAppSelector((state) => state.modal);
  const user = useAppSelector((state) => state.user);
  const { clean } = useClean();
  const route = useRouter();
  const { all } = useAppSelector((state) => state.module);

  useEffect(() => {
    dispatch(update({ inactive: profile && !profile?.active }));
  }, [profile?.active, dispatch]);

  const getModalContent = () => {
    if (profile) {
      return {
        image: NotFoundGif,
        title: t.modal("inactive.title"),
        description: t.modal("inactive.description", { company: profile.company?.name ?? "-" }),
      };
    }
  };

  const handleProfileChange = (profileId: string) => {
    const personalModule = all.find((m) => m.title === "personal");
    route.push(`/hidrate?profileId=${profileId}&moduleId=${personalModule?.id}`);
    dispatch(update({ inactive: false }));
  };

  const content = getModalContent();

  return (
    <AlertDialog open={isModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-col items-center justify-center gap-4 p-5 text-center">
            {content?.image && (
              <Image
                src={content?.image}
                height={100}
                width={100}
                alt="Aviso"
                className="scale-125"
              />
            )}
            <AlertDialogTitle className="text-muted-foreground text-2xl font-semibold">
              {content?.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm font-semibold">
              {content?.description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col gap-2 sm:flex-row sm:justify-center">
          <Button variant={"destructive"} onClick={() => clean()}>
            {t.helper("exit")}
          </Button>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{t.helper("change_profile")}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContentInModal
              className="min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-lg"
              sideOffset={4}
              align="end"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <span className="text-xs font-semibold text-gray-400">
                    {t.helper("available_profiles")}
                  </span>
                </DropdownMenuLabel>
                {user?.profiles?.map((p) => (
                  <AppProfileSelect
                    key={p.id}
                    profile={p}
                    isCurrentProfile={p.id === profile?.id}
                    onSelect={() => handleProfileChange(p.id)}
                  />
                ))}
                <DropdownMenuItem
                  onClick={() => {
                    route.push("/config/welcome");
                  }}
                  className={cn("flex items-center justify-between gap-2 px-2 py-3")}
                >
                  <span className="flex items-center gap-2 text-xs font-semibold">
                    <PlusCircle className="size-4" />
                    {t.helper("new_company")}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContentInModal>
          </DropdownMenu>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

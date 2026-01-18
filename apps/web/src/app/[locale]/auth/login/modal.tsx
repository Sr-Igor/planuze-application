import { useLang } from "@repo/language/hooks";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui-new";

import { AuthLogic } from "./logic";

export interface IAuthModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const AuthModal = ({ isOpen, onOpenChange }: IAuthModalProps) => {
  const t = useLang();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background/90 shadow-sidebar-accent flex max-w-md flex-col items-center gap-6 rounded-2xl border p-8 shadow-2xl backdrop-blur-md transition-all duration-300">
        <DialogHeader className="flex w-full flex-col items-center gap-1">
          <DialogTitle className="text-foreground mb-1 text-center text-2xl font-extrabold tracking-tight">
            {t.page.login("welcome_back")}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mb-2 text-center text-base font-normal">
            {t.page.login("do_login_to_continue")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col items-center gap-4">
          <AuthLogic />
        </div>
      </DialogContent>
    </Dialog>
  );
};

import { useEffect, useState } from "react";

import { KeyRound, Mail, Phone } from "lucide-react";

import { user_two_auth } from "@repo/api/generator/types";

import { useUserTwoAuth } from "@/api/callers/user_two_auth";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { update as updateUser } from "@/store/modules/user/actions";
import { hookValidate } from "@repo/utils/submitForm";

import { useConfirmForm } from "../use-confirm-form";
import { useDestroyForm } from "../use-destroy-form";
import { useForm } from "../use-form";

type State = {
  open: boolean;
  item: user_two_auth | null;
  modal: "store" | "update" | "exclude" | "confirm";
};

export const usePage = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [state, setState] = useState<State>({
    open: false,
    item: null,
    modal: "store",
  });

  const onSuccess = (data: user_two_auth[]) => {
    dispatch(updateUser({ user_two_auths: data }));
    setState({ ...state, open: false, item: null, modal: "store" });
  };

  const { store, update, destroy, resend, confirm } = useUserTwoAuth({
    id: state.item?.id,
    callbacks: {
      store: {
        onSuccess: onSuccess,
      },
      update: {
        onSuccess: onSuccess,
      },
      destroy: {
        onSuccess: onSuccess,
      },
      confirm: {
        onSuccess: onSuccess,
      },
    },
  });

  const getIcon = (method: string) => {
    switch (method) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "phone":
        return <Phone className="h-4 w-4" />;
      default:
        return <KeyRound className="h-4 w-4" />;
    }
  };

  const form = useForm({
    data: state.item,
    disabled: false,
  });

  const confirmForm = useConfirmForm({
    disabled: confirm.isPending,
  });

  const destroyForm = useDestroyForm({
    disabled: destroy.isPending,
  });

  const handleSubmit = () => {
    const hooks = [{ hook: form.hook, data: state.item || {} }];
    hookValidate(hooks, (form) => {
      state.item ? update.mutate(form) : store.mutate(form);
    });
  };

  const handleDestroy = () => {
    const hooks = [{ hook: destroyForm.hook }];
    hookValidate(hooks, (form) => {
      destroy.mutate(form);
    });
  };

  const handleConfirm = () => {
    const hooks = [{ hook: confirmForm.hook }];
    hookValidate(hooks, (form) => {
      confirm.mutate(form);
    });
  };

  useEffect(() => {
    if (!state.open) {
      form.hook.reset();
      confirmForm.hook.reset();
      destroyForm.hook.reset();
    }
  }, [state.open]);

  return {
    getIcon,
    form,
    confirmForm,
    destroyForm,
    store,
    update,
    destroy,
    resend,
    confirm,
    setState,
    state,
    user,
    handleSubmit,
    handleDestroy,
    handleConfirm,
  };
};

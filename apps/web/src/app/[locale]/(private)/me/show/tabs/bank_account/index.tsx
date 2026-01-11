import { profile, profile_bank_account } from "@repo/api/generator/types";

import { CardListTemplate } from "@/templates/card-list";
import { RegisterCard } from "@/templates/card-list/cards/register";
import { useShow } from "@/templates/show/context";

import { useForm } from "./use-form";

export const BankAccount = () => {
  return (
    <CardListTemplate<profile, profile_bank_account>
      path="me"
      translate="show.bank_account"
      dataAccess="profile_bank_accounts"
      useShow={useShow}
      card={(props) => {
        return (
          <RegisterCard<profile_bank_account>
            {...props}
            key={props.local_id}
            useForm={useForm}
            logs={{ hidden: true }}
          />
        );
      }}
      getFilters={(data) => ({
        profile_id: data?.id,
      })}
    />
  );
};

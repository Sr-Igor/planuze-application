import { useEffect, useRef } from "react";

import { getCep } from "@repo/api/global/cep";
import { IValidatorRequest } from "@repo/form";
import { useFormList } from "@repo/form";
import { Field } from "@repo/form";
import { company_address } from "@repo/types";

export type FormType = {
  street?: string | null;
  complement?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zip_code?: string | null;
  company_id?: string;
  number?: string | null;
  neighborhood?: string | null;
};

const defaultValues: Partial<FormType> = {
  country: "Brazil",
};

const schema: IValidatorRequest = {
  body: [
    {
      key: "street",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
    {
      key: "complement",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
    {
      key: "city",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
    {
      key: "state",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
    {
      key: "country",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
    {
      key: "zip_code",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
    {
      key: "client_id",
      method: "string",
      coerse: "string",
      model: "client",
      column: "id",
      optional: true,
    },
    {
      key: "number",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
    {
      key: "neighborhood",
      method: "string",
      coerse: "string",
      optional: true,
      nullable: true,
    },
  ],
};

export type UseFormProps = {
  data?: Partial<company_address>;
  disabled?: boolean;
};

export const useForm = ({ data, disabled }: UseFormProps) => {
  const skipEffect = useRef({
    city: false,
    state: false,
  });

  const fields: Field<FormType>[] = [
    {
      field: "cep",
      name: "zip_code",
      label: "zip_code",
      className: "col-span-3",
      disabled,
    },
    {
      field: "input",
      name: "street",
      label: "street",
      className: "col-span-3",
      disabled,
    },
    {
      field: "input",
      name: "neighborhood",
      label: "neighborhood",
      className: "col-span-3",
      disabled,
    },
    {
      field: "input",
      name: "number",
      label: "number",
      className: "col-span-3",
      disabled,
    },
    {
      field: "country",
      name: "country",
      label: "country",
      className: "col-span-2",
      disabled,
    },
    {
      field: "state",
      name: "state",
      label: "state",
      className: "col-span-2",
      disabled,
    },
    {
      field: "city",
      name: "city",
      label: "city",
      className: "col-span-2",
      disabled,
    },
    {
      field: "input",
      name: "complement",
      label: "complement",
      className: "col-span-6",
      disabled,
    },
  ];

  const form = useFormList<FormType>({
    fields,
    schema,
    values: data,
    defaultValues,
  });

  const zip_code = form.hook.watch("zip_code");
  const country = form.hook.watch("country");
  const stateField = form.hook.watch("state");

  useEffect(() => {
    if (!form.isDirty) return;

    const cepRegex = /^\d{5}-\d{3}$/;
    if (zip_code && cepRegex.test(zip_code)) {
      const setFields = async () => {
        try {
          const cepData = await getCep(zip_code);

          if (cepData.erro) {
            return;
          }

          if (cepData.localidade) {
            skipEffect.current.city = true;
            form.hook.setValue("city", cepData.localidade);
            form.hook.clearErrors("city");
          }

          if (cepData.logradouro) {
            form.hook.setValue("street", cepData.logradouro);
            form.hook.clearErrors("street");
          }

          if (cepData.bairro) {
            form.hook.setValue("neighborhood", cepData.bairro);
            form.hook.clearErrors("neighborhood");
          }

          if (cepData.estado) {
            skipEffect.current.state = true;
            form.hook.setValue("state", cepData.estado);
            form.hook.clearErrors("state");
          }
        } catch (error) {
          console.error("Error fetching CEP:", error);
        }
      };
      setFields();
    }
  }, [zip_code]);

  useEffect(() => {
    if (!form.isDirty) return;

    if (skipEffect.current.state) {
      skipEffect.current.state = false;
      return;
    }

    if (data?.country !== country) {
      form.hook.setValue("state", "");
    } else {
      form.hook.resetField("state");
    }
  }, [country, data?.country]);

  useEffect(() => {
    if (!form.isDirty) return;
    if (skipEffect.current.city) {
      skipEffect.current.city = false;
      return;
    }

    if (data?.state !== stateField) {
      form.hook.setValue("city", "");
    } else {
      form.hook.resetField("city");
    }
  }, [stateField, data?.state]);

  return {
    ...form,
    formProps: {
      ...form.formProps,
      fields: form.formProps.fields.map((field) => {
        return {
          ...field,
          country,
          state: stateField,
        };
      }),
    },
    config: {
      schema,
      fields,
      defaultValues,
    },
  };
};

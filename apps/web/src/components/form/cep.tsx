import { Input } from "@repo/ui";

import { formatCep } from "./utils/cep";

export const Cep = (
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) => {
  return (
    <Input
      {...props}
      onChange={(e) => {
        const value = formatCep(e.target.value);
        e.target.value = value;
        props.onChange?.(e);
      }}
    />
  );
};

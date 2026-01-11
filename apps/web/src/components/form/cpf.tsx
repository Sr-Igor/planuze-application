import { Input } from "@repo/ui";

import { formatCpf } from "./utils/cpf";

export const Cpf = (
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) => {
  return (
    <Input
      {...props}
      onChange={(e) => {
        const value = formatCpf(e.target.value);
        e.target.value = value;
        props.onChange?.(e);
      }}
    />
  );
};

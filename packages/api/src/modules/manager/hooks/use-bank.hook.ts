import { useQuery } from "@tanstack/react-query";

import { bankEndpoint } from "../endpoints/bank";
import type { Bank } from "../endpoints/bank/bank.types";

export const useBank = () => {
  const index = useQuery<Bank[]>({
    queryKey: ["bank"],
    queryFn: bankEndpoint.index,
  });

  return index;
};

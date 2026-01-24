import keys from "#/cache/keys";
import { getBanks } from "#/global/bank";
import { useQuery } from "@tanstack/react-query";

export const useBank = () => {
  const index = useQuery({
    queryKey: keys.bank.index(),
    queryFn: getBanks,
  });

  return index;
};

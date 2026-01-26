import type { Bank } from "./bank.types";

export const bankEndpoint = {
  index: async (): Promise<Bank[]> => {
    const response = await fetch(`https://brasilapi.com.br/api/banks/v1`);
    const data = await response.json();

    const codeBanks = data.filter((item: any) => item.code !== null);

    return codeBanks.map((item: any) => ({
      value: item.code,
      code: item.code,
      name: item.name,
      label: `${item.code} - ${item.name}`,
    }));
  },
};

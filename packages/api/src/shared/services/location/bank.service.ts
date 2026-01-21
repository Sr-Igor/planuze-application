/**
 * Bank information from BrasilAPI
 */
export interface IBank {
  value: string;
  label: string;
  code: string;
  name: string;
}

/**
 * Get list of Brazilian banks
 * Uses BrasilAPI public API
 *
 * @returns List of banks with code, name and label
 */
export const getBanks = async (): Promise<IBank[]> => {
  const response = await fetch(`https://brasilapi.com.br/api/banks/v1`);
  const data = await response.json();

  const codeBanks = data.filter((item: any) => item.code !== null);

  return codeBanks.map((item: any) => ({
    value: item.code,
    code: item.code,
    name: item.name,
    label: `${item.code} - ${item.name}`,
  }));
};

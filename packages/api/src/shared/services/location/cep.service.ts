/**
 * CEP response from ViaCEP API
 */
export interface CepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  estado: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

/**
 * Get address information from a Brazilian CEP (postal code)
 * Uses ViaCEP public API
 *
 * @param cep - Brazilian postal code (with or without formatting)
 * @returns Address information
 */
export const getCep = async (cep: string): Promise<CepResponse> => {
  const formatCep = cep.replaceAll(/\D/g, "");

  const response = await fetch(`https://viacep.com.br/ws/${formatCep}/json/`);
  const data = await response.json();

  return data as CepResponse;
};

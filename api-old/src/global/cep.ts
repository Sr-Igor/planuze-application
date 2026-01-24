export interface CepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  estado: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const getCep = async (cep: string): Promise<CepResponse> => {
  const formatCep = cep.replaceAll(/\D/g, "");

  const response = await fetch(`https://viacep.com.br/ws/${formatCep}/json/`);
  const data = await response.json();

  return data as CepResponse;
};

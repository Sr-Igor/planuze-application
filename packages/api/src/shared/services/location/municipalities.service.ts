/**
 * Municipality/district information
 */
export interface IMunicipality {
  label: string;
  value: string;
}

const URL = (uf: string) =>
  `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`;

/**
 * Get list of municipalities for a Brazilian state (UF)
 * Uses IBGE public API
 *
 * @param uf - Brazilian state code (e.g., "SP", "RJ")
 * @returns List of municipalities with label and value
 */
export const getMunicipalities = async (uf: string): Promise<IMunicipality[]> => {
  try {
    const response = await fetch(URL(uf));

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    // São Paulo capital is not in the API response
    if (uf.toLowerCase() === "sp") {
      data.push({ nome: "São Paulo" });
    }

    return data
      .map((municipality: { nome: string }) => ({
        label: municipality.nome,
        value: municipality.nome.toLowerCase(),
      }))
      .sort((a: { label: string }, b: { label: any }) => a.label.localeCompare(b.label));
  } catch (error) {
    console.error("Error fetching municipalities:", error);

    return [];
  }
};

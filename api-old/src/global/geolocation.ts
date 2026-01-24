const URL = (uf: string) => `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`;

export const municipalities = async (uf: string) => {
    try {
        const response = await fetch(URL(uf));

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();

        if (uf.toLowerCase() === 'sp') {
            data.push({ nome: 'São Paulo' });
        }

        return data
            .map((municipality: { nome: string }) => ({
                label: municipality.nome,
                value: municipality.nome.toLowerCase()
            }))
            .sort((a: { label: string }, b: { label: any }) => a.label.localeCompare(b.label));
    } catch (error) {
        console.error('Error fetching municipalities:', error);

        return [];
    }
};

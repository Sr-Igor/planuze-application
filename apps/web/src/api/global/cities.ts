export interface ICity {
    label: string;
    value: string;
}

export async function getCities(country: string, state: string): Promise<ICity[]> {
    const res = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, state })
    });
    if (!res.ok) throw new Error(`Erro ${res.status}`);
    const { data } = await res.json();

    const mapped: ICity[] =
        data?.map((city: string) => ({
            label: city,
            value: city
        })) || [];

    return mapped.sort((a, b) => a.label.localeCompare(b.label));
}

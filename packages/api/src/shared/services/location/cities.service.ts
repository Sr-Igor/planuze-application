/**
 * City information
 */
export interface ICity {
  label: string;
  value: string;
}

/**
 * Get list of cities for a state in a country
 * Uses Countries Now public API
 *
 * @param country - Name of the country
 * @param state - Name of the state
 * @returns List of cities with label and value
 */
export async function getCities(country: string, state: string): Promise<ICity[]> {
  const res = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country, state }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  const { data } = await res.json();

  const mapped: ICity[] =
    data?.map((city: string) => ({
      label: city,
      value: city,
    })) || [];

  return mapped.sort((a, b) => a.label.localeCompare(b.label));
}

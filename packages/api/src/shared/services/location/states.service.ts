/**
 * State information
 */
export interface State {
  label: string;
  value: string;
}

/**
 * Get list of states for a country
 * Uses Countries Now public API
 *
 * @param countryName - Name of the country
 * @returns List of states with label and value
 */
export async function getStates(countryName: string): Promise<State[]> {
  const res = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ country: countryName }),
  });

  if (!res.ok) throw new Error(`${res.statusText} ${res.status}`);
  const { data } = await res.json();

  const mapped: State[] =
    data?.states.map((state: any) => ({
      label: state.name,
      value: state.name,
    })) || [];

  return mapped.sort((a, b) => a.label.localeCompare(b.label));
}

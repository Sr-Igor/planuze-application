/**
 * Country information from REST Countries API
 */
export interface Country {
  name: string;
  code: string;
  flag: string;
  meta: any;
}

/**
 * Get list of all countries
 * Uses REST Countries public API
 *
 * @returns List of countries with name, code, flag and metadata
 */
export const getCountries = async (): Promise<Country[]> => {
  const response = await fetch(
    `https://restcountries.com/v3.1/all?fields=name,cca2,flags,languages`
  );
  const data = await response.json();

  const countries = data
    .map((country: any) => ({
      name: country.name.common,
      code: country.cca2,
      flag: country.flags.svg,
      meta: country,
    }))
    .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

  return countries;
};

export function fetchCountries(searchQuery) {
  const BASE_URL = 'https://restcountries.com/v2';
  const OPTIONS = 'fields=name,capital,population,flags,languages';
  return fetch(`${BASE_URL}/name/${searchQuery}?${OPTIONS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

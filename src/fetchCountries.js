import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  const searchParam = new URLSearchParams({
    fields: 'name,capital,flags,population,languages',
  });
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?${searchParam}`
  ).then(resp => {
    if (!resp.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    }
    return resp.json();
  });
}

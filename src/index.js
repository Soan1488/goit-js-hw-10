import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  listEl: document.querySelector('.country-list'),
  infoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
  clearList();
  if (refs.inputEl.value.trim() === '') {
    return;
  } else {
    fetchCountries(refs.inputEl.value.trim())
      .then(data => makeCountries(data))
      .catch(error => {
        clearList();
        return;
      });
  }
}

function makeCountries(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many maches found. Please enter a more specific name'
    );
    return;
  } else if (countries.length === 1) {
    renderMarkUp(countries);
    return;
  } else {
    renderMarkUps(countries);
  }
}

function renderMarkUps(countries) {
  const markUp = countries
    .map(({ flags, name }) => {
      return `<li class="country-list__item"><img src="${flags.svg}" alt="contry flag" width="25px"> ${name.official}</li>`;
    })
    .join('');
  refs.listEl.innerHTML = markUp;
}

function renderMarkUp(country) {
  const markUp = country
    .map(item => {
      return `<li class="country-list__item"><img src="${item.flags.svg}" alt="contry flag" width="25px"> ${item.name.official}</li>`;
    })
    .join('');
  const markUpFields = country
    .map(({ capital, population, languages }) => {
      return `<p>Capital: ${capital}</p><p>Population: ${population}</p><p>Languages: ${Object.values(
        languages
      )}</p>`;
    })
    .join('');
  refs.listEl.innerHTML = markUp;
  refs.infoEl.innerHTML = markUpFields;
}

function clearList() {
  refs.listEl.innerHTML = '';
  refs.infoEl.innerHTML = '';
}

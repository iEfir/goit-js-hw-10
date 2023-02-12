import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './countries-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  e.preventDefault();

  const searchQueryValue = e.target.value.trim();
  if (!searchQueryValue) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }
  fetchCountries(searchQueryValue)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if ((countries.length <= 10) & (countries.length >= 2)) {
        const listOFCountries = countries.map(c => countryListEl(c));
        countryList.innerHTML = listOFCountries.join('');
        countryInfo.innerHTML = '';
      }
      if (countries.length === 1) {
        const dataOFCountry = countries.map(c => countryInfoEl(c));
        countryInfo.innerHTML = dataOFCountry.join('');
        countryList.innerHTML = '';
      }
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function countryListEl({ name, flags }) {
  return `<li class='country-list__item'><img width='50' height='50' src='${flags.svg}'/><h2 class='lis-item-title'>${name}</h2></li>`;
}

function countryInfoEl({ name, capital, flags, population, languages }) {
  return `<div class='country-info__container'><img width='50' height='50' src='${flags.svg}'/><h2 class='item-title'>${name}</h2></div>
  <ul><li><b>Capital:</b><p>${capital}</p></li><li><b>Population:</b><p>${population}</p></li><li><b>Languages:</b><p>${languages[0].name}</p></li></ul>`;
}

import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from './js/fetchCountries'
import { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");
const listCountry = document.querySelector('.country-list');
const cardCountry = document.querySelector(".country-info");


inputEl.addEventListener("input", debounce(inputCountry, DEBOUNCE_DELAY));

function inputCountry() {
    const searchCountry = inputEl.value.trim();
    
fetchCountries(searchCountry).then(data => {
    return  data; })
.then(createListOfCountries)
.catch(error =>{ console.log(error);
clearCardCountry();
clearList();
Notify.failure("Oops, there is no country with that name");})
};

function createListOfCountries(data) {
    if (data.length >= 10){
        clearCardCountry();
        clearList();
        Notify.info("Too many matches found. Please enter a more specific name.");
    } if (data.length > 1 && data.length < 10){
        clearCardCountry();
        listCountry.innerHTML = data.map(({flags, name}) =>   
        ` <li class="country-list__item">
        <img src="${flags.svg}" alt="прапор" height="20" width="20"/>
        <p class="text">${name.official}</p>
        </li>`).join("");

    } if (data.length === 1){
         clearList() 
        cardCountry.innerHTML = data.map(({name,capital,population,languages,flags})=> 
        `<h1 class="country-list__item">
        <img src="${flags.svg}" alt="прапор" width="40"/>
        ${name.official}</h1>
        <p class="text">Capital: ${capital}</p>
        <p class="text">Population: ${population}</p>
        <p class="text">Languages: ${Object.values(languages)}</p>
        `).join("");   
}}
//  



function clearList() {
    listCountry.innerHTML = "";
};
 function clearCardCountry() {
  cardCountry.innerHTML = "";
 }


import { renderDate } from './Date';
import {
  getCurWeather,
  renderCurrentWeather,
  renderForecastWeather,
} from './Weather';
import { showGeolocation, getGeolocation } from './Map';
import changeBackroundImg from './Background';
import { getTranslation, localizations } from './Localizaion';

let curLanguage =
  localStorage.getItem('lang') === null ? 'en' : localStorage.getItem('lang');
let clock;
let currentPlace;

const changeSearchLanguage = (lang) => {
  const SEARCH_INPUT = document.querySelector('.control__search__input');
  const SEARCH_BTN = document.querySelector('.control__search__btn');
  SEARCH_INPUT.placeholder = localizations[lang].placeholder;
  SEARCH_BTN.textContent = localizations[lang].search;
};

const showLoader = () => {
  document.querySelector('.wrapper').style.opacity = 0;
  const loader = document.createElement('div');
  loader.classList.add('loader');
  document.querySelector('.container').append(loader);
};

const clearLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) loader.parentElement.removeChild(loader);
  document.querySelector('.wrapper').style.opacity = 1;
};

const getLocInfo = async (city) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=0f77ec2c8258447da389d59aace3246d`;

  const res = await fetch(url);
  document.querySelector('.control__search__notification').textContent = '';
  if (!res.ok) {
    document.querySelector(
      '.control__search__notification'
    ).textContent = `Something went wrong. Error: ${res.status}`;
    return false;
  }
  const json = await res.json();
  return json.results[0];
};

function renderCoordinates(loc, lang) {
  const LATITUDE = document.querySelector('#latitude');
  const LONGITUDE = document.querySelector('#longitude');
  const LAT_TEXT = document.querySelector('#latitude-text');
  const LON_TEXT = document.querySelector('#longitude-text');

  if (lang === 'ru') {
    LAT_TEXT.textContent = 'Широта: ';
    LON_TEXT.textContent = 'Долгота: ';
  } else if (lang === 'be') {
    LAT_TEXT.textContent = 'Шырата: ';
    LON_TEXT.textContent = 'Даўгата: ';
  } else {
    LAT_TEXT.textContent = 'Latitude: ';
    LON_TEXT.textContent = 'Longitude: ';
  }
  let [longitude, latitude] = loc;
  latitude = latitude.toFixed(2).split('.');
  latitude = `${latitude[0]}°${latitude[1]}"`;
  LATITUDE.textContent = latitude;
  longitude = longitude.toFixed(2).split('.');
  longitude = `${longitude[0]}°${longitude[1]}"`;
  LONGITUDE.textContent = longitude;
}

export async function renderPageInfo(value) {
  showLoader();

  await getLocInfo(value).then(async (data) => {
    currentPlace = value;

    const languageOptions = document.querySelectorAll('#language > option');
    if (curLanguage === 'ru') {
      languageOptions[1].selected = true;
    } else if (curLanguage === 'be') {
      languageOptions[2].selected = true;
    } else {
      languageOptions[0].selected = true;
    }

    changeSearchLanguage(curLanguage);

    if (data === undefined) {
      document.querySelector(
        '.control__search__notification'
      ).textContent = `No results for ${value}`;
      return false;
    }
    if (!data) {
      return false;
    }

    const coordinates = [data.geometry.lng, data.geometry.lat];
    renderCoordinates(coordinates, curLanguage);
    showGeolocation(coordinates);

    const place = `${
      data.components.city || data.components.state || data.components.town
      }, ${data.components.country}`;

    getTranslation(place, 'ru', curLanguage).then((trsl) => {
      document.querySelector('.info__city').textContent = trsl;
    });

    await getCurWeather(data.geometry.lat, data.geometry.lng).then((info) => {
      window.clearInterval(clock);
      const renderClock = () => {
        renderDate(info.timezone, curLanguage);
      };
      renderClock();
      clock = setInterval(renderClock, 1000);
    });

    changeBackroundImg();

    await renderCurrentWeather(
      data.geometry.lat,
      data.geometry.lng,
      curLanguage
    );
    await renderForecastWeather(
      data.geometry.lat,
      data.geometry.lng,
      curLanguage
    );
    return true;
  });
  clearLoader();
}

export function renderStartLocationInfo() {
  getGeolocation().then((data) => {
    renderPageInfo(data.city);
  });
}

export function changeLangSelect() {
  if (this.value === 'EN') {
    localStorage.setItem('lang', 'en');
    curLanguage = localStorage.getItem('lang');
    renderPageInfo(currentPlace);
  } else if (this.value === 'RU') {
    localStorage.setItem('lang', 'ru');
    curLanguage = localStorage.getItem('lang');
    renderPageInfo(currentPlace);
  } else if (this.value === 'BE') {
    localStorage.setItem('lang', 'be');
    curLanguage = localStorage.getItem('lang');
    renderPageInfo(currentPlace);
  }
}

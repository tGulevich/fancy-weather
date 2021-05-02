import { localizations, getTranslation } from './Localizaion';

const weatherKeyApi = '40694985a71946b4b28160bf6fc21555';

const WETHER_DESC = document.querySelector('#weather-desc');
const TEMP__FEELS = document.querySelector('#app-temp');
const WIND = document.querySelector('#wind');
const HUMIDITY = document.querySelector('#hm');
const WEATHER_ICON = document.querySelector('.weather__current__icon');
const FORECAST_DAYS = document.querySelectorAll('.weather__forecast__day');
const TEMP = document.querySelector('.weather__current__temp');
const UNITS_CONTROL = document.querySelector('.control__units');
const BTN_FAR = document.querySelector('#toggle-far');
const BTN_CEL = document.querySelector('#toggle-cel');

const checkedFar = JSON.parse(localStorage.getItem('farChecked'));

if (checkedFar) {
  BTN_CEL.checked = false;
  BTN_FAR.checked = true;
} else {
  BTN_CEL.checked = true;
  BTN_FAR.checked = false;
}

export const getCurWeather = async (lat, lon) => {
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${weatherKeyApi}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.data[0];
};

const getForecastWeather = async (lat, lon) => {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=4&lang=be&key=${weatherKeyApi}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.data;
};

const getWeatherIcon = (code) => {
  let icon;
  switch (true) {
    case code >= 200 && code <= 202:
      icon = 'weather-icons/cloudy-rain-lightning.svg';
      break;
    case code >= 230 && code <= 233:
      icon = 'weather-icons/cloudy-lightning.svg';
      break;
    case (code >= 300 && code <= 522) || code === 900:
      icon = 'weather-icons/rainy.svg';
      break;
    case code >= 600 && code <= 623:
      icon = 'weather-icons/snowy.svg';
      break;
    case (code >= 700 && code <= 761) || code === 804:
      icon = 'weather-icons/cloudy.svg';
      break;
    case code === 800:
      icon = 'weather-icons/sunny.svg';
      break;
    case code >= 801 && code <= 803:
      icon = 'weather-icons/cloudy-sun.svg';
      break;
    default:
      icon = 'weather-icons/cloudy-sun.svg';
  }
  return icon;
};

const convertToFahrenheit = (temp) => {
  return Math.round(temp * 1.8 + 32);
};

const convertToCelsius = (temp) => {
  return Math.round((temp - 32) / 1.8);
};

const changeTempUnits = () => {
  const isFar = JSON.parse(localStorage.getItem('farChecked'));
  if (isFar) {
    const currentTemp = document
      .querySelector('.weather__current__temp')
      .textContent.slice(0, -1);
    document.querySelector(
      '.weather__current__temp'
    ).textContent = `${convertToFahrenheit(currentTemp)}°`;
    FORECAST_DAYS.forEach((el) => {
      const forecastDayTemp = el.querySelector('.weather__forecast__temp');
      const value = forecastDayTemp.textContent.slice(0, -1);
      forecastDayTemp.textContent = `${convertToFahrenheit(value)}°`;
    });
  } else {
    const currentTemp = document
      .querySelector('.weather__current__temp')
      .textContent.slice(0, -1);
    document.querySelector(
      '.weather__current__temp'
    ).textContent = `${convertToCelsius(currentTemp)}°`;
    FORECAST_DAYS.forEach((el) => {
      const forecastDayTemp = el.querySelector('.weather__forecast__temp');
      const value = forecastDayTemp.textContent.slice(0, -1);
      forecastDayTemp.textContent = `${convertToCelsius(value)}°`;
    });
  }
};

UNITS_CONTROL.addEventListener('change', () => {
  if (BTN_FAR.checked) {
    localStorage.setItem('farChecked', true);
    changeTempUnits();
  } else if (BTN_CEL.checked) {
    localStorage.setItem('farChecked', false);
    changeTempUnits();
  }
});

export async function renderForecastWeather(lat, lon, curLang) {
  await getForecastWeather(lat, lon).then((data) => {
    FORECAST_DAYS.forEach((el, i) => {
      const tempValue = Math.round(data[i + 1].temp);
      const temp = el.querySelector('.weather__forecast__temp');
      if (checkedFar) {
        temp.textContent = `${convertToFahrenheit(tempValue)}°`;
      } else {
        temp.textContent = `${tempValue}°`;
      }
      const day = new Date(data[i + 1].datetime).getDay();
      const weekday = el.querySelector('.weather__forecast__weekday');

      if (curLang === 'en') {
        weekday.textContent = localizations.en.days_long[day];
      } else if (curLang === 'ru') {
        weekday.textContent = localizations.ru.days_long[day];
      } else if (curLang === 'be') {
        weekday.textContent = localizations.be.days_long[day];
      }

      const icon = getWeatherIcon(data[i + 1].weather.code);
      const forecastDay = el;
      forecastDay.style.backgroundImage = `url('${icon}')`;
    });
  });
}

export async function renderCurrentWeather(lat, lon, curLang) {
  await getCurWeather(lat, lon).then((data) => {
    const tempValue = Math.round(data.temp);
    if (checkedFar) {
      TEMP.textContent = `${convertToFahrenheit(tempValue)}°`;
    } else {
      TEMP.textContent = `${tempValue}°`;
    }
    const { description } = data.weather;
    const wind = Math.round(data.wind_spd);

    if (curLang === 'en') {
      WETHER_DESC.textContent = description;
      TEMP__FEELS.textContent = `Feels like: ${Math.round(data.app_temp)}°`;
      WIND.textContent = `Wind: ${wind} m/s`;
      HUMIDITY.textContent = `Humidity: ${data.rh}%`;
    } else if (curLang === 'ru') {
      getTranslation(description, 'en', curLang).then((trsl) => {
        WETHER_DESC.textContent = trsl;
      });
      TEMP__FEELS.textContent = `Ощущается как: ${Math.round(data.app_temp)}°`;
      WIND.textContent = `Ветер: ${wind} м/с`;
      HUMIDITY.textContent = `Влажность: ${data.rh}%`;
    } else if (curLang === 'be') {
      getTranslation(description, 'en', curLang).then((trsl) => {
        WETHER_DESC.textContent = trsl;
      });
      TEMP__FEELS.textContent = `Адчуваецца як: ${Math.round(data.app_temp)}°`;
      WIND.textContent = `Вецер: ${wind} м/с`;
      HUMIDITY.textContent = `Вільготнасць: ${data.rh}%`;
    }
    const icon = getWeatherIcon(Number(data.weather.code));
    WEATHER_ICON.src = icon;
  });
}

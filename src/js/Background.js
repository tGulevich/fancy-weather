import { getTranslation, localizations } from './Localizaion';

async function getImage(queryData) {
  queryData.then(async (query) => {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${query}&client_id=DNW2WQ_qhm-Y85oV3qXhtDmlQmi2l7uJeKNeEN0MsP8`;

    const res = await fetch(url);

    if (res.ok) {
      const json = await res.json();
      document.querySelector('#background').style.background = `rgb(77, 68, 55) 
        url('${json.urls.regular}') no-repeat`;
      document.querySelector('#background').style.backgroundSize = 'cover';
    } else {
      document.querySelector('#background').style.background = `rgb(77, 68, 55) 
        url('../background.jpg') no-repeat`;
      document.querySelector('#background').style.backgroundSize = 'cover';
    }
  });
}

async function getImgQuery() {
  let place = document.querySelector('.info__city').textContent.split(',')[0];
  const curLanguage = localStorage.getItem('lang');
  if (curLanguage !== 'en') {
    await getTranslation(place, curLanguage, 'en').then((trsl) => {
      place = trsl;
    });
  }

  const date = document
    .querySelector('.info__date')
    .textContent.trim()
    .split(' ');

  let monthIndex;
  if (localStorage.getItem('lang') === 'ru') {
    monthIndex = localizations.ru.months.indexOf(date[2]);
  } else if (localStorage.getItem('lang') === 'be') {
    monthIndex = localizations.be.months.indexOf(date[2]);
  } else {
    monthIndex = localizations.en.months.indexOf(date[2]);
  }

  const hours = Number(date[3].slice(0, 2));

  let month;
  let timeOfDay;

  switch (true) {
    case monthIndex <= 1 || monthIndex === 11:
      month = 'winter';
      break;
    case monthIndex >= 2 && monthIndex <= 4:
      month = 'spring';
      break;
    case monthIndex >= 5 && monthIndex <= 7:
      month = 'summer';
      break;
    case monthIndex >= 8 && monthIndex <= 10:
      month = 'autumn';
      break;
    default:
      month = '';
  }
  switch (true) {
    case hours === 23 || hours <= 5:
      timeOfDay = 'night';
      break;
    case hours >= 6 && hours <= 7:
      timeOfDay = 'sunrise';
      break;
    case hours >= 8 && hours <= 12:
      timeOfDay = 'morning';
      break;
    case hours >= 13 && hours <= 18:
      timeOfDay = 'afternoon';
      break;
    case hours >= 19 && hours <= 22:
      timeOfDay = 'dusk';
      break;
    default:
      timeOfDay = '';
  }
  const query = `${timeOfDay} ${month} ${place}`;
  console.log(`The query of background image is: ${query}`);
  return query;
}

export default function changeBackroundImg() {
  getImage(getImgQuery());
}

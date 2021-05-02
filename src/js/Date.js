import { localizations } from './Localizaion';

export function getCurrentDate(timezone) {
  let dateCurrent = new Date().toLocaleString('en-US', { timeZone: timezone });
  dateCurrent = new Date(dateCurrent);
  const month = dateCurrent.getMonth();
  const hours = dateCurrent.getHours();
  return [month, hours];
}
export function renderDate(timezone, lang) {
  let dateCurrent = new Date().toLocaleString('en-US', { timeZone: timezone });

  dateCurrent = new Date(dateCurrent);

  const day = dateCurrent.getDay();
  const date = dateCurrent.getDate();
  const month = dateCurrent.getMonth();
  let hours = dateCurrent.getHours();
  let mins = dateCurrent.getMinutes();
  let secs = dateCurrent.getSeconds();

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (mins < 10) {
    mins = `0${mins}`;
  }
  if (secs < 10) {
    secs = `0${secs}`;
  }

  const now = `${localizations[lang].days_short[day]} ${date} ${
    localizations[lang].months[month - 1]
  } ${hours}:${mins}:${secs}`;

  document.querySelector('.info__date').textContent = now;
}

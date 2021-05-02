import { renderStartLocationInfo, changeLangSelect } from './js/RenderInfo';
import searchPlace from './js/Search';
import changeBackroundImg from './js/Background';
import controlVoiceInput from './js/SpeechRec';

const RELOAD_BTN = document.querySelector('.control__btn--reload');
const LANG_SELECT = document.querySelector('#language');

window.onload = () => {
  renderStartLocationInfo();
  searchPlace();
  RELOAD_BTN.addEventListener('click', changeBackroundImg);
  LANG_SELECT.addEventListener('change', changeLangSelect);
  controlVoiceInput();
};

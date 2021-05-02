import { renderPageInfo } from './RenderInfo';

const MIC_BTN = document.querySelector('.control__btn--microphone');

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = false;

const listener = () => {
  recognition.start();
};

export default function controlVoiceInput() {
  MIC_BTN.addEventListener('click', () => {
    document
      .querySelector('.control__btn--microphone')
      .classList.toggle('control__btn--mic-active');
    const micBtn = document.querySelector('.control__btn--microphone');

    recognition.addEventListener('result', (evt) => {
      if (localStorage.getItem('lang') === 'ru') {
        recognition.lang = 'ru';
      } else if (localStorage.getItem('lang') === 'be') {
        recognition.lang = 'be';
      } else {
        recognition.lang = 'en-US';
      }
      const transcript = Array.from(evt.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      document.querySelector('.control__search__input').value = transcript;
      const searchValue = document.querySelector('.control__search__input')
        .value;
      if (searchValue) {
        renderPageInfo(searchValue);
      }
    });

    if (micBtn.classList.contains('control__btn--mic-active')) {
      recognition.start();
      recognition.addEventListener('end', listener, false);
    } else {
      recognition.stop();
      recognition.removeEventListener('end', listener, false);
    }
  });
}

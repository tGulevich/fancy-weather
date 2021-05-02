import { renderPageInfo } from './RenderInfo';

const SEARCH_FORM = document.querySelector('#search-form');

export default function searchPlace() {
  SEARCH_FORM.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const searchValue = document
      .querySelector('.control__search__input')
      .value.toString();
    renderPageInfo(searchValue);
  });
}

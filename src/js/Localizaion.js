export const localizations = {
  en: {
    days_long: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    days_short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    placeholder: 'Search city',
    search: 'Search',
  },
  ru: {
    days_long: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    days_short: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    placeholder: 'Поиск города',
    search: 'Поиск',
  },
  be: {
    days_long: [
      'нядзеля',
      'панядзелак',
      'аўторак',
      'серада',
      'чацвер',
      'пятніца',
      'субота',
    ],
    days_short: ['Нд', 'Пн', 'Ау', 'Ср', 'Чц', 'Пт', 'Сб'],
    months: [
      'Студзень',
      'Люты',
      'Сакавік',
      'Красавік',
      'Май',
      'Чэрвень',
      'Ліпень',
      'Аўгуст',
      'Верасень',
      'Кастрычнік',
      'Лістапад',
      'Cнежань',
    ],
    placeholder: 'Пошук горада',
    search: 'Пошук',
  },
};

export async function getTranslation(text, curLang, rightLang) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200425T192830Z.51d8a4ea321bde09.ccb165d3f8674943b55c07a4fb455d7f912dfa3f&text=${text}&lang=${curLang}-${rightLang}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.text[0];
}

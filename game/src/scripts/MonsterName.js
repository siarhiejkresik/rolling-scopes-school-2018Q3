import { randomArrayElement } from './utils.js';

const firstNames =
  'васпане вясёлы грэшны дурны зялёны кволы лядашчы магутны моцны п’яны святы спагадны сумны хірлявы цвярозы';
const secondNames =
  'асілак бамбіза боўдзіла вісус дуронік жэўжык злодзей зялепуха ламіна накольнік падшыванец уломак цяльпук шалапут шаляніца шыбенік';
const lastNames =
  'Алесь Васіль Гапей Лука Лёва Макей Мартын Мацвей Мікола Міхаіл Навум Несцер Рыгор Сцяпан Тонік';

// TODO: rename module, move constants into an another file
// TODO: create an array of names from an string only once

const capitalize = str => str && str[0].toUpperCase() + str.slice(1);
const stringToArray = str => str.trim().split(/ +/);

export default () => {
  return [firstNames, secondNames, lastNames]
    .map((name, i) => {
      name = randomArrayElement(stringToArray(name)).toLowerCase();
      return i === 1 ? name : capitalize(name);
    })
    .join(' ');
};

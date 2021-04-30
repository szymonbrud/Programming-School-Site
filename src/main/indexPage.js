import '../scss/main.scss';

import secrets from '../assets/secrets';
import { defaultsDeep, reduce } from 'lodash';

fetch(secrets.api, {
  method: 'POST',
  body: JSON.stringify({
    query: `query{
        offersByLvls{
          id,
          level,
          programmingLanguage,
          willLearn
        }
    }`,
    variables: { id: 1 },
  }),
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    res.data.offersByLvls.forEach((arg) => {
      console.log(arg.programmingLanguage);

      //1 pogrupować na języki[]
      //zrobić divy danych poziomów
      //po zrobieniu kontenera iterowaćpo liniach

      let levels = document.querySelector('.levels');
      let allText = '';
      const text = arg.willLearn.split('\n');
      text.forEach((textElement) => {
        console.log(textElement);
        allText += `<p class="willLearn">-${textElement}</p>`;
      });
      levels.innerHTML =
        '<div class="contentContainer"><p class = "level">' +
        arg.level +
        '</p>' +
        '<p>' +
        allText +
        '</p>';
    });
  })
  .catch((e) => Error(e));

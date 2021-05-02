import gsap from 'gsap';

import '../scss/main.scss';
import '../scss/menuPhone.scss';
import '../scss/topBarMenuPhone.scss';
import '../scss/footer.scss';
import '../scss/topBarMenuDesktop.scss';

import secrets from '../assets/secrets';
import contactForm from '../assets/contactForm';
import menuPhone from '../assets/menuPhone';

const choseLanguageText = document.querySelector('.choseLanguageText');
const languageButton = document.querySelector('.languageFlexButton');

let courses = null;
let languages = [];
let selectedLanguage = null;

const editListOfProgrammingHTML = (list) => {
  const languagesContainerHTML = document.querySelector('.languages');

  languagesContainerHTML.innerHTML = '';
  list.forEach((language) => {
    languagesContainerHTML.innerHTML =
      languagesContainerHTML.innerHTML + `<p class="languagesList ${language}">${language}</p>`;
  });

  const languagesList = document.querySelectorAll('.languagesList');

  languagesList.forEach((languagesListElement) => {
    languagesListElement.addEventListener('click', () => {
      selectedLanguage = languagesListElement.textContent;
      choseLanguageText.innerHTML = languagesListElement.textContent;
      const indexToDelete = languages.findIndex(
        (language) => language === languagesListElement.textContent
      );

      const languagesWithoutSelectedOption = languages.slice();

      languagesWithoutSelectedOption.splice(indexToDelete, 1);
      editListOfProgrammingHTML(languagesWithoutSelectedOption);
    });
  });
};

fetch(secrets.api, {
  method: 'POST',
  body: JSON.stringify({
    query: `query{
        courses{
          id,
          title,
          desc,
          image {
            url,
          },
          level,
          programmingLanguage
        }
      }`,
    variables: { id: 1 },
  }),
})
  .then((res) => res.json())
  .then((res) => {
    courses = res.data.courses;
    const allProgrammingLanguages = [];

    res.data.courses.forEach(({ programmingLanguage }) => {
      const isAlreadyLanguegeInside = allProgrammingLanguages.findIndex(
        (language) => language === programmingLanguage
      );
      if (isAlreadyLanguegeInside === -1) {
        allProgrammingLanguages.push(programmingLanguage);
      }
    });

    languages = allProgrammingLanguages;

    editListOfProgrammingHTML(languages);
  })
  .catch((e) => Error(e));

let isProgrammingListOpen = false;

languageButton.addEventListener('click', () => {
  if (isProgrammingListOpen) {
    gsap.to(languageButton, 0.2, {
      height: '44px',
    });
  } else {
    gsap.to(languageButton, 0.2, {
      height:
        selectedLanguage === null ? languages.length * 54 + 30 : (languages.length - 1) * 54 + 30,
    });
  }
  isProgrammingListOpen = !isProgrammingListOpen;
});

window.addEventListener('load', () => {
  contactForm();
  menuPhone();
});

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

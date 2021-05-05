import gsap from 'gsap';

import '../scss/main.scss';
import '../scss/menuPhone.scss';
import '../scss/topBarMenuPhone.scss';
import '../scss/footer.scss';
import '../scss/topBarMenuDesktop.scss';
import '../scss/prices.scss';

import secrets from '../assets/secrets';
import contactForm from '../assets/contactForm';
import menuPhone from '../assets/menuPhone';
import menuNavigation from '../assets/menuNavigation';
import loadingPage from '../assets/loadingPage';
import { scrollTo } from '../assets/scrollTo';

const choseLanguageText = document.querySelector('.choseLanguageText');
const languageButton = document.querySelector('.languageFlexButton');
const coursesClipBoard = document.querySelector('.coursesClipBoard');
const headerTextCourse = document.querySelector('.headerTextCourse');

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
  let levelText = document.querySelector('.choseLevelMotivatonLanguage');

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

      let levels = document.querySelector('.levels');
      levelText.style.display = 'block';
      levels.innerHTML = '';
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

          let currentTargetArr = [];
          res.data.offersByLvls.forEach((arg) => {
            let allText = '';
            const text = arg.willLearn.split('\n');
            text.forEach((textElement) => {
              allText += `<p class="willLearn">-${textElement}</p>`;
            });

            if (languages[indexToDelete] === arg.programmingLanguage) {
              levels.innerHTML +=
                `<div class="contentContainer" id="${arg.level}"><p class = "level">` +
                arg.level +
                '</p>' +
                '<p>' +
                allText +
                '</p>';

              let levelsArray = [];
              const levelButton = document.querySelectorAll('.contentContainer');
              levelButton.forEach((levelBut) => {
                levelBut.addEventListener('click', (event) => {
                  coursesClipBoard.innerHTML = '';
                  levelsArray.push(event.currentTarget.id);
                  currentTargetArr.push(event.currentTarget);

                  if (levelsArray[0] != event.currentTarget.id) {
                    currentTargetArr[0].classList.remove('active');
                    levelsArray.splice(0, 1);
                    currentTargetArr.splice(0, 1);
                  }
                  event.currentTarget.classList.add('active');
                  courses.forEach((coursesEach) => {
                    if (
                      coursesEach.level === levelsArray[0] &&
                      arg.programmingLanguage === coursesEach.programmingLanguage
                    ) {
                      headerTextCourse.style.display = 'block';
                      coursesClipBoard.innerHTML +=
                        '<div class="coursesButton"><p class="coursesTitle">' +
                        coursesEach.title +
                        '</p>' +
                        '<p class="coursesPrice">' +
                        coursesEach.price +
                        'zł' +
                        '</p>' +
                        `<p class="coursesDesc">${coursesEach.desc}...</p>` +
                        `<div class="coursesImage" style="background-image:url("${coursesEach.image.url}");"></div>` +
                        '<button class="showMoreCourses">Sing up</button>' +
                        '</div>';
                    }
                  });
                });
              });
            }
          });
        })
        .catch((e) => Error(e));
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
          programmingLanguage,
          price,
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
  menuNavigation();
  loadingPage();
  scrollTo('joinUs', 'choseLanguageList');
});

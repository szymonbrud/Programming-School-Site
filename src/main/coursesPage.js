import gsap from 'gsap';

import '../scss/menuPhone.scss';
import '../scss/topBarMenuPhone.scss';
import '../scss/courses.scss';
import '../scss/footer.scss';
import '../scss/topBarMenuDesktop.scss';

import menuPhone from '../assets/menuPhone';
import secrets from '../assets/secrets';
import menuNavigation from '../assets/menuNavigation';
import loadingPage from '../assets/loadingPage';

let selectedLanguage = null;
let selectedLevel = null;

let languages = [];
let courses = [];
let levels = [];

const generateTheCoursesHTML = () => {
  const coursesWrapperHTML = document.querySelector('.coursesWrapper');

  coursesWrapperHTML.innerHTML = '';

  const filteredCourse = [];

  courses.forEach((course) => {
    if (selectedLanguage && course.programmingLanguage !== selectedLanguage) return;
    if (selectedLevel && course.level !== selectedLevel) return;
    filteredCourse.push(course);
  });

  filteredCourse.forEach((course) => {
    const HTML = `
      <article class="courseElementWrapper">
        <p class="courseElementTitle">
          ${course.title}
        </p>
        <div class="courseElementImage" style="background-image: url(${course.image.url});"></div>
        <p class="courseElementDesc">
          ${course.desc}
        </p>
        <p class="courseElementPrice">
          ${course.price}PLN
        </p>
        <a class="courseElementButton">zapisz się</a>
      </article>
    `;

    coursesWrapperHTML.innerHTML += HTML;
  });

  const courseElements = document.querySelectorAll('.courseElementWrapper');

  courseElements.forEach((courseElem) => {
    courseElem.addEventListener('click', () => {
      const isOpen = courseElem.classList.contains('open');

      if (isOpen) {
        courseElem.style.height = '76px';
      } else {
        courseElem.style.height = 'auto';
      }

      courseElem.classList.toggle('open');
    });
  });
};

const filter = () => {
  const button = document.querySelector('.filterButton');
  const filterWrapper = document.querySelector('.filterWrapper');

  let isFilterOpen = false;
  let isLanguageListOpen = false;
  let isLevelListOpen = false;

  const renderLanguageHTML = () => {
    const languageHTML = `
      <div class="filterLanguageWrapper filterWrapperEach">
        <p class="filterLanguage filterTitleEach">${
          selectedLanguage ? `Język: ${selectedLanguage}` : 'Język'
        }</p>
        <div class="filterLanguageListWrapper filterListWrapperEach">
          ${languages
            .map(
              (languageElement) =>
                `<p class="filterLanguageListElement filterListElementEach">${languageElement}</p>`
            )
            .join('')}
        </div>
      </div>
    `;

    const levelHTML = `
      <div class="filterLevelWrapper filterWrapperEach">
        <p class="filterLevel filterTitleEach">${
          selectedLevel ? `Poziom: ${selectedLevel}` : 'Poziom'
        }</p>
        <div class="filterLevelListWrapper filterListWrapperEach">
          ${levels
            .map(
              (levelElement) =>
                `<p class="filterLevelListElement filterListElementEach">${levelElement}</p>`
            )
            .join('')}
        </div>
      </div>
    `;

    const clearButtonHTML = `
      <p class="filterClearButton">Clear</p>
    `;

    filterWrapper.innerHTML = languageHTML;
    filterWrapper.innerHTML += levelHTML;
    filterWrapper.innerHTML += clearButtonHTML;

    const filterLanguageButton = document.querySelector('.filterLanguage');
    const filterLanguageListWrapper = document.querySelector('.filterLanguageListWrapper');
    const filterLanguageListElements = document.querySelectorAll('.filterLanguageListElement');

    filterLanguageListElements.forEach((filterLanguageListElement) => {
      filterLanguageListElement.addEventListener('click', (event) => {
        selectedLanguage = event.target.textContent;

        renderLanguageHTML();
        isLanguageListOpen = false;
      });
    });

    filterLanguageButton.addEventListener('click', () => {
      if (isLanguageListOpen) {
        gsap.to(filterLanguageButton, 0.1, {
          color: '#FFF',
        });

        filterLanguageListWrapper.style.display = 'none';
      } else {
        gsap.to(filterLanguageButton, 0.1, {
          color: '#4CB77D',
        });

        filterLanguageListWrapper.style.display = 'block';
      }

      isLanguageListOpen = !isLanguageListOpen;
    });

    const filterLevelButton = document.querySelector('.filterLevel');
    const filterLevelListWrapper = document.querySelector('.filterLevelListWrapper');
    const filterLevelListElement = document.querySelectorAll('.filterLevelListElement');

    filterLevelListElement.forEach((filterLevelsListElement) => {
      filterLevelsListElement.addEventListener('click', (event) => {
        selectedLevel = event.target.textContent;

        renderLanguageHTML();
        isLevelListOpen = false;
      });
    });

    filterLevelButton.addEventListener('click', () => {
      if (isLevelListOpen) {
        gsap.to(filterLevelButton, 0.1, {
          color: '#FFF',
        });

        filterLevelListWrapper.style.display = 'none';
      } else {
        gsap.to(filterLevelButton, 0.1, {
          color: '#4CB77D',
        });

        filterLevelListWrapper.style.display = 'block';
      }

      isLevelListOpen = !isLevelListOpen;
    });

    const clearButton = document.querySelector('.filterClearButton');

    clearButton.addEventListener('click', () => {
      selectedLanguage = null;
      selectedLevel = null;
      console.log('he');
      filterLevelButton.textContent = 'Poziom';
      filterLanguageButton.textContent = 'Język';
    });
  };

  renderLanguageHTML(languages, levels);

  button.addEventListener('click', () => {
    if (isFilterOpen) {
      const tl = gsap.timeline();

      tl.to(button, 0.2, {
        left: '-52px',
      });

      tl.to(filterWrapper, 0.2, {
        left: '-100%',
      });

      tl.to(button, {
        background: '#78DCA6',
      });

      tl.to(button, 0.2, {
        left: 0,
      });

      setTimeout(() => {
        button.innerHTML = 'filter';
      }, 200);
      generateTheCoursesHTML();
    } else {
      const tl = gsap.timeline();

      tl.to(button, 0.2, {
        left: '-52px',
      });

      tl.to(filterWrapper, 0.2, {
        left: 0,
      });

      tl.to(button, {
        background: '#4CB77D',
      });

      tl.to(button, 0.2, {
        left: 0,
      });

      setTimeout(() => {
        button.innerHTML = 'close';
      }, 200);
    }

    isFilterOpen = !isFilterOpen;
  });
};

window.addEventListener('load', () => {
  menuPhone();
  menuNavigation();
  loadingPage();
});

fetch(secrets.api, {
  method: 'POST',
  body: JSON.stringify({
    query: `query{
        courses{
          id,
          title,
          desc,
          price,
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
    const allLeves = [];

    res.data.courses.forEach(({ programmingLanguage, level }) => {
      const isAlreadyLanguegeInside = allProgrammingLanguages.findIndex(
        (language) => language === programmingLanguage
      );

      const isAlreadyLevelInside = allLeves.findIndex((levelElement) => levelElement === level);

      if (isAlreadyLevelInside === -1) {
        allLeves.push(level);
      }

      if (isAlreadyLanguegeInside === -1) {
        allProgrammingLanguages.push(programmingLanguage);
      }
    });

    languages = allProgrammingLanguages;

    levels = ['JUNIOR', 'REGULAR', 'SENIOR'];

    console.log(levels);

    generateTheCoursesHTML(courses);
    filter();
  })
  .catch((e) => Error(e));

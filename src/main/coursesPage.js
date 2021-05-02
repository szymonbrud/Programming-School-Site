import '../scss/menuPhone.scss';
import '../scss/topBarMenuPhone.scss';
import '../scss/courses.scss';
import '../scss/footer.scss';

import menuPhone from '../assets/menuPhone';
import secrets from '../assets/secrets';

window.addEventListener('load', () => {
  menuPhone();
});

let languages = [];
let courses = [];

const generateTheCoursesHTML = (coursesArg) => {
  const coursesWrapperHTML = document.querySelector('.coursesWrapper');

  coursesWrapperHTML.innerHTML = '';

  courses.forEach((course) => {
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

  console.log(coursesArg);
};

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

    res.data.courses.forEach(({ programmingLanguage }) => {
      const isAlreadyLanguegeInside = allProgrammingLanguages.findIndex(
        (language) => language === programmingLanguage
      );
      if (isAlreadyLanguegeInside === -1) {
        allProgrammingLanguages.push(programmingLanguage);
      }
    });

    languages = allProgrammingLanguages;

    generateTheCoursesHTML(courses);
  })
  .catch((e) => Error(e));

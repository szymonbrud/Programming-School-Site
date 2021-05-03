import '../scss/about.scss';
import '../scss/menuPhone.scss';
import '../scss/topBarMenuPhone.scss';
import '../scss/topBarMenuDesktop.scss';
import '../scss/footer.scss';

import MenuPhone from '../assets/menuPhone';

const aboutArticles = [
  {
    title: 'Nasza kadra nauczycielska',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non consectetur sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non consectetur sapien. ',
  },
  {
    title: 'Zdalne Nauczanie',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non consectetur sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non consectetur sapien. ',
  },
  {
    title: 'Współpraca',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non consectetur sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non consectetur sapien. ',
  },
];

const generateTheArticles = () => {
  const aboutBoxMainWrapperHTML = document.querySelector('.aboutBoxMainWrapper');

  aboutBoxMainWrapperHTML.innerHTML = '';

  aboutArticles.forEach((aboutArticleElement, index) => {
    const HTML = `
      <article class="aboutBoxWrapper ${index % 2 && 'aboutBoxWrapperSecound'}">
        <h5 class="aboutBoxTitle">${aboutArticleElement.title}</h5>
        <p class="aboutBoxDesc">${aboutArticleElement.desc}</p>
        <span class="aboutBoxNumber">${index + 1}</span>
      </article>
    `;

    aboutBoxMainWrapperHTML.innerHTML += HTML;
  });
};

window.addEventListener('load', () => {
  MenuPhone();
  generateTheArticles();
});

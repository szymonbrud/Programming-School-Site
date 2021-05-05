import '../scss/about.scss';
import '../scss/menuPhone.scss';
import '../scss/topBarMenuPhone.scss';
import '../scss/topBarMenuDesktop.scss';
import '../scss/footer.scss';

import MenuPhone from '../assets/menuPhone';
import loadingPage from '../assets/loadingPage';

const aboutArticles = [
  {
    title: 'Our teaching staff',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non consectetur sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non consectetur sapien. ',
    imgPath: 'aboutPhoto1.png',
  },
  {
    title: 'Remote Teaching',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non consectetur sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non consectetur sapien. ',
    imgPath: 'aboutPhoto2.jpg',
  },
  {
    title: 'Cooperation',
    desc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non consectetur sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non consectetur sapien. ',
    imgPath: 'aboutPhoto3.png',
  },
];

const generateTheArticles = () => {
  const aboutBoxMainWrapperHTML = document.querySelector('.aboutBoxMainWrapper');

  aboutBoxMainWrapperHTML.innerHTML = '';

  aboutArticles.forEach((aboutArticleElement, index) => {
    const HTML = `
    <div style="grid-column: ${index % 2 ? '2/3' : '1/2'}; grid-row: ${index + 1}/${
      index + 2
    }; background-image: url(./images/${aboutArticleElement.imgPath});" class="aboutBoxImage"></div>
      <article class="aboutBoxWrapper ${
        index % 2 && 'aboutBoxWrapperSecound'
      }" style="grid-column: ${index % 2 ? '1/2' : '2/3'}">
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
  loadingPage();
});

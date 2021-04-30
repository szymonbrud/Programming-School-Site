import '../scss/main.scss';

let languageButton = document.querySelector('.languageFlexButton');
languageButton.addEventListener('click', () => {
  let allProgrammingLanguages = document.querySelector('.allLanguages');
  let choseLanguageIcon = document.querySelector('.choseLanguageIcon');
  if (allProgrammingLanguages.style.display === 'none') {
    allProgrammingLanguages.style.display = 'block';
    choseLanguageIcon.style.transform = 'rotate(90deg)';
  } else {
    allProgrammingLanguages.style.display = 'none';
    choseLanguageIcon.style.transform = 'rotate(0deg)';
  }
});

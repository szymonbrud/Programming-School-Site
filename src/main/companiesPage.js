import '../scss/topBarMenuPhone.scss';
import '../scss/topBarMenuDesktop.scss';
import '../scss/menuPhone.scss';
import '../scss/companies.scss';
import '../scss/footer.scss';

import menuPhone from '../assets/menuPhone';

const main = () => {
  const companiesPhoneButton = document.querySelector('.companiesPhoneButton');
  const companiesMailButton = document.querySelector('.companiesMailButton');

  companiesPhoneButton.addEventListener('click', () => {
    companiesPhoneButton.innerHTML = '+48 125 583 850';
  });

  companiesMailButton.addEventListener('click', () => {
    const footer = document.querySelector('footer');

    window.scrollTo({
      top: footer.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  });
};

window.addEventListener('load', () => {
  menuPhone();
  main();
});

const mainPath = '/dist/';

const menuSettings = ['index.html', 'courses.html', 'companies.html'];

export default () => {
  const pathname = window.location.pathname;

  const menuItemLinks = document.querySelectorAll('.menuItemLink');
  const menuItemLinksPhone = document.querySelectorAll('.menuItemIdentify');

  menuSettings.forEach((menuElemenet, index) => {
    if (`${mainPath}${menuElemenet}` === pathname) {
      menuItemLinks[index].classList.add('menuItemLinkActive');
      menuItemLinksPhone[index].classList.add('menuItemLinkActivePhone');
    }
  });
};

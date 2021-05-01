import gsap, { Back } from 'gsap';

export default () => {
  const menuWrapperForPhone = document.querySelector('.mainWrapperMenuPhone');
  const burger = document.querySelector('.burger');
  const menuItems = document.querySelectorAll('.menuItemIdentify');
  const socials = document.querySelector('.menuPhoneSocialWrapper');

  let isOpen = false;

  burger.addEventListener('click', () => {
    if (isOpen) {
      const tl = gsap.timeline();

      tl.to(menuWrapperForPhone, 0.2, {
        x: 0,
      });
    } else {
      const tl = gsap.timeline();

      tl.to(menuWrapperForPhone, 0.2, {
        x: '100%',
      });

      menuItems.forEach((item) => {
        tl.from(item, 0.15, {
          delay: 0.1,
          x: '-100vw',
          ease: Back.easeOut.config(1.7),
        });
      });

      tl.from(socials, 0.2, {
        y: '50vh',
        ease: Back.easeOut.config(1.7),
      });
    }
    isOpen = !isOpen;
  });
};

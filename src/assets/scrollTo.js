export const scrollTo = (classNameElement, classNameScrollToElement) => {
  const elementScrolled = document.querySelector(`.${classNameElement}`);

  elementScrolled.addEventListener('click', () => {
    const elementThatScrollingTo = document.querySelector(`.${classNameScrollToElement}`);

    window.scrollTo({
      top: elementThatScrollingTo.offsetTop,
      left: 0,
      behavior: 'smooth',
    });
  });
};

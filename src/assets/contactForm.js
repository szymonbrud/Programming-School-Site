export default () => {
  const allInputs = document.querySelectorAll('.input');
  const sendButton = document.querySelector('.footerFormSendButton');

  allInputs.forEach((input) => {
    input.addEventListener('change', () => {
      let isEmpty = false;
      allInputs.forEach((inputInside) => {
        if (inputInside.value === '') {
          isEmpty = true;
        }
      });
      if (!isEmpty) {
        sendButton.disabled = false;
      } else {
        sendButton.disabled = true;
      }
    });
  });
};

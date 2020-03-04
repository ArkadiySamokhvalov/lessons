function validationCalc() {
  const inputs = document.querySelectorAll('#calc input[type="number"]');

  inputs.forEach((item) => {
    item.addEventListener('keypress', (event) => {
      if (!event.key.match(/[\d]/)) {
        event.preventDefault();
      }
    });
  });
}


function validationForms() {
  const formPhone = document.querySelectorAll('.form-phone'),
    formText = document.querySelectorAll('.form-name, mess');

  formPhone.forEach((item) => {
    item.addEventListener('keypress', (event) => {
      if (!event.key.match(/[\d\+]/)) {
        event.preventDefault();
      }
    });
  });

  formText.forEach((item) => {
    item.addEventListener('keypress', (event) => {
      if (!event.key.match(/[а-я\s]/i)) {
        event.preventDefault();
      }
    });
  });
}

export default {validationCalc, validationForms};

function checkValidation(input, language, button, error) {
  const isValid = input.validity.valid;
  
  if (isValid) {
    error.textContent = '';
    toggleButtonState(button, input);

  } else {
    if (language === 'en') {
      error.textContent = 'Please fill in this field.';
      toggleButtonState(button, input);
    }
    else if (language === 'ru') {
      error.textContent = 'Заполните это поле.';
      toggleButtonState(button, input);
    }

  }

}

function disableButton (button) {
  button.setAttribute('disabled', true);
  button.classList.add('button-disabled');
}

function toggleButtonState (button, input) {
  const isValid = input.validity.valid;
  if (!isValid) {
    disableButton(button);
    input.classList.add('input-error');
  }
  else {
    button.removeAttribute('disabled', true);
    button.classList.remove('button-disabled');
    input.classList.remove('input-error');
  }

}

export {checkValidation};
const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  submitButtonSelectorDisabled: 'popup__button-submit_disabled',
  inputErrorSelector: 'popup__input_type_error',
  errorSelector: 'popup__form-error_visible',
}

enableValidation(obj);

function enableValidation (obj) {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, obj);
  });
};

function setEventListeners (formElement, obj)  {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, obj);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement, obj);
      checkInputValidity(formElement, inputElement, obj);
    });
  });
};

function checkInputValidity (formElement, inputElement, obj) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideError(formElement, inputElement, obj);
  }
};

function showError (formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorSelector);
  errorElement.classList.add(obj.errorSelector);
  errorElement.textContent = errorMessage;
};

function hideError (formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorSelector);
  errorElement.classList.remove(obj.errorSelector);
  errorElement.textContent = '';
};

function hasInvalidInput (inputList)  {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

function toggleButtonState (inputList, buttonElement, obj) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(obj.submitButtonSelectorDisabled);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(obj.submitButtonSelectorDisabled);
  }
};

function cleanError() {
  const errors = document.querySelectorAll('.popup__form-error_visible');
  errors.forEach((error) => {
    error.classList.remove('popup__form-error_visible');
})
  const inputErrors = document.querySelectorAll('.popup__input_type_error');
  inputErrors.forEach((inputError) => {
  inputError.classList.remove('popup__input_type_error');
})}
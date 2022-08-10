class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
             
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
  });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }    
  }

  _showError(inputElement, errorMessage) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorSelector);
    this._errorElement.classList.add(this._settings.errorSelector);
    this._errorElement.textContent = errorMessage;
  }
  
  _hideError(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorSelector);
    this._errorElement.classList.remove(this._settings.errorSelector);
    this._errorElement.textContent = '';
  }

  _hasInvalidInput()  {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._settings.submitButtonSelectorDisabled);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._settings.submitButtonSelectorDisabled);
    }
  }

  cleanError() {
    this._errors = document.querySelectorAll('.popup__form-error_visible');
    this._errors.forEach((error) => {
      error.classList.remove('popup__form-error_visible');
    })
    this._inputErrors = document.querySelectorAll('.popup__input_type_error');
    this._inputErrors.forEach((inputError) => {
    inputError.classList.remove('popup__input_type_error');
    })
  }  
}

export default FormValidator;

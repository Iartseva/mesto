class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {         
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
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._settings.submitButtonSelectorDisabled);
    }
  }

  cleanError() {
    this._inputList.forEach((input) => {
      this._hideError(input);
    })
  }

  disableButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(`${this._settings.submitButtonSelectorDisabled}`);
  }
}

export default FormValidator;

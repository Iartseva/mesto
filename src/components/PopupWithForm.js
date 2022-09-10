import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(selectorPopup, callbackSubmitForm) {
    super(selectorPopup);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popup = document.querySelector(selectorPopup);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    }

  _getInputValues() {
     const formValues = {};
        this._inputList.forEach(input => {
          formValues[input.name] = input.value;
        });
        return formValues;
}
  
  setInputValues(data) {
    this._inputList.forEach((input) => {
    input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
      this.close();
    })}

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
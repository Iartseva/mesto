import Popup from "./Popup.js";

class popupDeleteCard extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popup = document.querySelector(selectorPopup);
    this._form = this._popup.querySelector('.popup__form');
    }

  submitDelete(remove) {
    this._handleSubmit = remove;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit();
      super.close();
    })}
}

export default popupDeleteCard;
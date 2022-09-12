import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this.imagePopup = this._popup.querySelector('.popup__image');
    this.caption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    this.imagePopup.src = link;
    this.imagePopup.alt = name;
    this.caption.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
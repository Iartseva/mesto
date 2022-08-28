import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this.imagePopup = document.querySelector('.popup__image');
    this.caption = document.querySelector('.popup__caption');
  }

  open(name, link) {
    this.imagePopup.src = link;
    this.imagePopup.alt = name;
    this.caption.textContent = name;
    super.open();;
  }
}

export default PopupWithImage;
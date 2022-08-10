import {showPopupImage} from './index.js'; 

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }
  // получаем шаблон
  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }
  //создаем карточку
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(); //вызываем слушатели
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
     
    return this._element;
  }
  //устанавливаем слушатели
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active')});
    
    this._element.querySelector('.element__delete').addEventListener('click', (evt) => {
      evt.target.closest('.element').remove()});

    this._element.querySelector('.element__image').addEventListener('click', showPopupImage);
    }
}

export default Card;
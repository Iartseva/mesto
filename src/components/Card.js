class Card {
  constructor(data, templateSelector, showPopupImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._showPopupImage = showPopupImage;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
    
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
    this._setEventListeners(); //вызываем слушатели
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
     
    return this._element;
  }
  //устанавливаем слушатели
  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active')});
    
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      //this._element.closest('.element').remove();
      this._element.remove();
      this._element = null;    
    });

    this._image.addEventListener('click', () => {
      this._showPopupImage(this._name, this._link);
    });
    }
}

export default Card;
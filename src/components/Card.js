class Card {
  constructor(data, templateSelector, showPopupImage, handleSetLike, handleRemoveLike, handleDeleteCard, userId) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerCardId = data.owner._id;
    this._templateSelector = templateSelector;
    this._showPopupImage = showPopupImage;
    this._handleSetLike = handleSetLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteCard = handleDeleteCard;
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.element__image');
    this._title = this._element.querySelector('.element__title');
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete');
    this._likesCount = this._element.querySelector('.element__like-count');    
    this._cardId = data._id;
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
    this._title.textContent = this._name;

    this.isCardLiked();
    this._likesCount.textContent = this._likes.length;

    this.deleteDeleteButton();

    return this._element;
  }

  //подсчет лайков
  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesCount.textContent = this._likes.length;
    this._likeButton.classList.toggle('element__like_active');
  }

  isCardLiked() {
    if (this._likes.some((user) => {
      return this._userId === user._id;
    })) {
      this._likeButton.classList.add('element__like_active');
    }
  }

  //удаление кнопки удаления карты
  deleteDeleteButton() {
    if (this._ownerCardId !== 'a51735410a02ac14d281e541') {
      this._deleteButton.remove();
    }
  }
  //удаление карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //устанавливаем слушатели
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__like_active')) {
        this._handleRemoveLike(this._cardId);
      } else {
        this._handleSetLike(this._cardId);
      }
    });
    
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this._cardId);;    
    });

    this._image.addEventListener('click', () => {
      this._showPopupImage(this._name, this._link);
    });
    }
}

export default Card;
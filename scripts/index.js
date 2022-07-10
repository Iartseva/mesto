//попап редактирования профиля
const popupEditProfile = document.querySelector('#popup-edit-profile');

const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('#button-close');

let inputName = document.querySelector('.popup__input_type_name');
let inputDescription = document.querySelector('.popup__input_type_role');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

let formEditProfile = document.querySelector('.popup__form-edit-profile');

const openPopupEditProfile = function() {
  popupEditProfile.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}
const closePopupEditProfile = function() {
  popupEditProfile.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopupEditProfile); 
closePopupButton.addEventListener('click', closePopupEditProfile);

//редактирование профиля
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopupEditProfile(); 
}
 
formEditProfile.addEventListener('submit', formSubmitHandler);
 
//попап добавления карточки
const popupAdd = document.querySelector('#popup-add-card');
const addButton = document.querySelector('.profile__add-button');
const closePopupAddCard = document.querySelector('#close-popup-add');

const openPopupAdd = function() {
  popupAdd.classList.add('popup_opened');
 }
const closePopupAdd = function() {
  popupAdd.classList.remove('popup_opened');
}

addButton.addEventListener('click', openPopupAdd); 
closePopupAddCard.addEventListener('click', closePopupAdd);

//добавление новой карточки
const inputTitle = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');

let formAddCard = document.querySelector('.popup__form-add-card');

function createCard (evt) {
  evt.preventDefault(); 

  const card = cards.cloneNode(true);
  card.querySelector('.element__title').textContent = inputTitle.value;
  card.querySelector('.element__image').src = inputLink.value;
  card.querySelector('.element__image').alt = inputTitle.value;
   
  elements.prepend(card);
  closePopupAdd();
  
  const newLike = document.querySelectorAll('.element__like');
  newLike.forEach(item => {
    item.addEventListener('click', likeCreate);
  });
 
  const newDelete = document.querySelectorAll('.element__delete');
  newDelete.forEach(item => {
    item.addEventListener('click', deleteCard);
  });

  return card;
}

formAddCard.addEventListener('submit', createCard);

//карточки по умолчанию
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const elements = document.querySelector('.elements');
const cards = document.querySelector('#cards').content;

initialCards.forEach(function initionCard(item) {
const card = cards.cloneNode(true);
card.querySelector('.element__title').textContent = item.name;
card.querySelector('.element__image').src = item.link;
card.querySelector('.element__image').alt = item.name;
elements.append(card);
});

//удаление карточки
const cardDeleteButton = document.querySelectorAll('.element__delete');
cardDeleteButton.forEach(item => {
  item.addEventListener('click', deleteCard);
});

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}; 

//попап картинки
const popupImage = document.querySelector('#popup-image');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
const captionHtml = document.querySelector('.element__title');

const popupImageButton = document.querySelectorAll('.element__image');
popupImageButton.forEach(item => {
  item.addEventListener('click', openPopupImage);
  
});

const popupImageCloseButton = document.querySelectorAll('#close-popup-image');
popupImageCloseButton.forEach(item => {
  item.addEventListener('click', closePopupImage);
});

function openPopupImage(evt) {
  popupImage.classList.add('popup_opened');
  image.src = evt.target.src;
  caption.textContent=evt.target.nextElementSibling.textContent;
} 

function closePopupImage() {
  popupImage.classList.remove('popup_opened');
}

//лайк карточек
const like = document.querySelectorAll('.element__like');
like.forEach(item => {
  item.addEventListener('click', likeCreate);
});

function likeCreate(evt) {
  evt.target.classList.toggle('element__like_active');
}


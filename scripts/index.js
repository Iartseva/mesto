const popupElement = document.querySelector('.popup'); 
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button'); //кнопка открытия
const addButton = document.querySelector('.profile__add-button');//кнопка открытия
const closeButton = document.querySelectorAll('.popup__button-close');//кнопки закрытия

const formEdit = document.querySelector('.popup__form-edit-profile');//форма редактирования
const formAdd = document.querySelector('.popup__form-add-card');//форма добавления карточки

const inputName = document.querySelector('.popup__input_type_name'); 
const inputDescription = document.querySelector('.popup__input_type_role'); 
const profileName = document.querySelector('.profile__name'); 
const profileDescription = document.querySelector('.profile__description');
const inputTitlePlace = document.querySelector('.popup__input_type_place'); 
const inputLink = document.querySelector('.popup__input_type_link');

const elements = document.querySelector('.elements');

const like = document.querySelectorAll('.element__like');
const cardDeleteButton = document.querySelectorAll('.element__delete');

//попапы (открытие и закрытие)
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  createValue();
});
addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

closeButton.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openImage(evt) {
  openPopup(popupImage);
  image.src = evt.target.src;
  caption.textContent=evt.target.nextElementSibling.textContent;
} 

//редактирование профиля
function editProfile(evt) { 
  evt.preventDefault();  
  profileName.textContent = inputName.value; 
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEdit);  
} 

formEdit.addEventListener('submit', editProfile);

//значения формы редактирования профиля
function createValue() {
  inputName.value = profileName.textContent; 
  inputDescription.value = profileDescription.textContent; 
}

//создание карточки
function createCard(item) {
  const cardTemplate = document.querySelector('#cards').content;
  const element = cardTemplate.querySelector('.element');
  const card = element.cloneNode(true); 
  card.querySelector('.element__title').textContent = item.name; 
  card.querySelector('.element__image').src = item.link; 
  card.querySelector('.element__image').alt = item.name; 
  card.querySelector('.element__like').addEventListener('click', likeCreate);
  card.querySelector('.element__delete').addEventListener('click', deleteCard);
 
  return card;
}

//добавление карточки на страницу через форму
function addCard(evt) {
  evt.preventDefault();
  const newCardName = inputTitlePlace.value;
  const newCardImage = inputLink.value;
  elements.prepend(createCard({name: newCardName, link: newCardImage}));
  closePopup(popupAdd);
}

formAdd.addEventListener('submit', addCard);

//добавление первоначальных карточек
const initialCards = [
  {
    name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

initialCards.forEach((el) => {const card = createCard(el); 
elements.append(card)});

//попап с картинками
const captionHtml = document.querySelector('.element__title');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
const imageButton = document.querySelectorAll('.element__image');

function showPopupImage(evt) {
  openPopup(popupImage);
  image.src = evt.target.src;
  caption.textContent=evt.target.nextElementSibling.textContent;
}

imageButton.forEach(item => {
  item.addEventListener('click', showPopupImage);
});

//лайки
like.forEach(item => {
  item.addEventListener('click', likeCreate);
});

function likeCreate(evt) {
  evt.target.classList.toggle('element__like_active');
}

//удаление карточки
cardDeleteButton.forEach(item => {
  item.addEventListener('click', deleteCard);
});

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

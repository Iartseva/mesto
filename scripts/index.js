import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupEdit = document.querySelector('.popup_type_edit'); //попаg редактирования профиля
const popupAdd = document.querySelector('.popup_type_add'); // попад добавления карточки
const popupImage = document.querySelector('.popup_type_image'); // попап с картинкой
const buttonEdit = document.querySelector('.profile__edit-button'); //кнопка открытия
const buttonAdd = document.querySelector('.profile__add-button');//кнопка открытия
const buttonsClose = document.querySelectorAll('.popup__button-close');//кнопки закрытия
const buttonSubmitAdd = document.querySelector('#button-submit-add');//кнопка сабмита добавления карточки
const formEdit = document.querySelector('.popup__form_type_edit-profile');//форма редактирования профиля
const formAdd = document.querySelector('.popup__form_type_add-card');//форма добавления карточки
const inputName = document.querySelector('.popup__input_type_name'); 
const inputDescription = document.querySelector('.popup__input_type_role'); 
const profileName = document.querySelector('.profile__name'); 
const profileDescription = document.querySelector('.profile__description');
const inputTitlePlace = document.querySelector('.popup__input_type_place'); 
const inputLink = document.querySelector('.popup__input_type_link');
const cardsContainer = document.querySelector('.elements');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

const initialCards = [
  {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
]; 

const selectorsForValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  submitButtonSelectorDisabled: 'popup__button-submit_disabled',
  inputErrorSelector: 'popup__input_type_error',
  errorSelector: 'popup__form-error_visible',
}

//попапы (открытие и закрытие)
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}
    
function closePopupByOverlay(popup) {
  popup.addEventListener('click', function(evt) {
    if (evt.target !== evt.currentTarget) {
      return;
    }
    closePopup(popup);
  })
}

closePopupByOverlay(popupEdit);
closePopupByOverlay(popupAdd);
closePopupByOverlay(popupImage);

function closePopupByEscape(evt, popup) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  createValue();
  validatorFormEditProfile.cleanError();
});
buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  formAdd.reset();
  validatorFormAddCard.cleanError();
  buttonSubmitAdd.setAttribute('disabled', true);
  buttonSubmitAdd.classList.add('popup__button-submit_disabled');
});
buttonsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
  });

//значения формы редактирования профиля
function createValue() {
  inputName.value = profileName.textContent; 
  inputDescription.value = profileDescription.textContent; 
}
//редактирование профиля
function editProfile(evt) { 
  evt.preventDefault();  
  profileName.textContent = inputName.value; 
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEdit);  
} 

formEdit.addEventListener('submit', editProfile);

//добавление карточки на страницу через форму
function addCard(evt) {
  evt.preventDefault();
  const cardNew = new Card(inputTitlePlace.value, inputLink.value, '#cards').generateCard();
  cardsContainer.prepend(cardNew);
  closePopup(popupAdd);
}

formAdd.addEventListener('submit', addCard);

//попап с картинками
function showPopupImage(evt) {
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  caption.textContent = evt.target.alt;;
  openPopup(popupImage);
}

// создание первоначальных карточек
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '#cards');
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

// включаем валидацию
const validatorFormEditProfile = new FormValidator(selectorsForValidate, formEdit);
const validatorFormAddCard = new FormValidator(selectorsForValidate, formAdd);

validatorFormEditProfile.enableValidation();
validatorFormAddCard.enableValidation();

export {showPopupImage};
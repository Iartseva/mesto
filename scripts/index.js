import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {initialCards, selectorsForValidate} from "./data.js";

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
const imagePopup = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');
const imageElement = document.querySelector('.element__image');

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
  formAdd.reset();
  validatorFormAddCard.cleanError();
  validatorFormAddCard.buttonDesable(buttonSubmitAdd);
  openPopup(popupAdd);
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

//попап с картинками
function showPopupImage(name, link) {
  imagePopup.src = link;
  imagePopup.alt = name;
  caption.textContent = name;
  openPopup(popupImage);
}

//создание карточки как экземпляра класса
function createCard(item) {
  const newCard = new Card(item.name, item.link, '#cards', showPopupImage).generateCard();
  return newCard;
}
//добавление первоначальных карточек
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
  });

//добавление карточки через форму
function addCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createCard({name: inputTitlePlace.value, link: inputLink.value}));
  closePopup(popupAdd);
}

formAdd.addEventListener('submit', addCard);

// включаем валидацию
const validatorFormEditProfile = new FormValidator(selectorsForValidate, formEdit);
const validatorFormAddCard = new FormValidator(selectorsForValidate, formAdd);

validatorFormEditProfile.enableValidation();
validatorFormAddCard.enableValidation();
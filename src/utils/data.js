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

const elementContainer = '.elements';

const popupEdit = '.popup_type_edit';
const popupImage = '.popup_type_image';
const popupAdd = '.popup_type_add';

const buttonEdit = document.querySelector('.profile__edit-button'); //кнопка открытия
const buttonAdd = document.querySelector('.profile__add-button');//кнопка открытия
const buttonSubmitAdd = document.querySelector('#button-submit-add');//кнопка сабмита добавления карточки
const formEdit = document.querySelector('.popup__form_type_edit-profile');//форма редактирования профиля
const formAdd = document.querySelector('.popup__form_type_add-card');//форма добавления карточки
const inputTitlePlace = document.querySelector('.popup__input_type_place');
const inputLink = document.querySelector('.popup__input_type_link');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_role');


export {initialCards, selectorsForValidate, elementContainer, 
  popupEdit, popupImage, popupAdd,
buttonEdit, buttonAdd, buttonSubmitAdd, formEdit, formAdd, inputTitlePlace, inputLink, inputName, inputDescription};
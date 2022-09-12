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
const popupAvatar = '.popup_type_edit-avatar';
const popupDelete = '.popup_type_delete';
const profileName = '.profile__name';
const profileDescription = '.profile__description';
const profileAvatar = '.profile__avatar-image';

const buttonEdit = document.querySelector('.profile__edit-button'); //кнопка открытия
const buttonAdd = document.querySelector('.profile__add-button');//кнопка открытия
const buttonAvatar = document.querySelector('.profile__avatar'); // кнопка открытия
const formEdit = document.querySelector('.popup__form_type_edit-profile');//форма редактирования профиля
const formAdd = document.querySelector('.popup__form_type_add-card');//форма добавления карточки
const formEditAvatar = document.querySelector('.popup__form_type_edit-avatar'); //форма редактирования аватара

export {selectorsForValidate, elementContainer, 
popupEdit, popupImage, popupAdd, popupAvatar, popupDelete,
buttonEdit, buttonAdd, buttonAvatar,
formEdit, formAdd, formEditAvatar,
profileName, profileDescription, profileAvatar};

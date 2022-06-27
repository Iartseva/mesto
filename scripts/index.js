//открытие и закрытие попапа
const popupElement = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__button-close');

let inputName = document.querySelector('.popup__input_type_name');
let inputDescription = document.querySelector('.popup__input_type_role');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', openPopup); 
closePopupButton.addEventListener('click', closePopup);

//внесение изменений
let formElement = document.querySelector('.popup__form-edit-profile');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(); 
}
 
formElement.addEventListener('submit', formSubmitHandler);
 










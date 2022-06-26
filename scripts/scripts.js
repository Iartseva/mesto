//открытие и закрытие попапа
const popupElement = document.querySelector('.popup');
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__button-close');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  let inputName = document.querySelector('.popup__name');
  let inputDescription = document.querySelector('.popup__role');
  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

openPopupButton.addEventListener('click', openPopup); 
closePopupButton.addEventListener('click', closePopup);

//внесение изменений
let formElement = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  // Получите значение полей jobInput и nameInput из свойства value
  let inputName = document.querySelector('.popup__name').value;
  let inputDescription = document.querySelector('.popup__role').value;
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = document.querySelector('.profile__name');
  let profileDescription = document.querySelector('.profile__description');
  // Вставьте новые значения с помощью textContent
  profileName.textContent = inputName;
  profileDescription.textContent = inputDescription;
}

formElement.addEventListener('submit', formSubmitHandler); 
formElement.addEventListener('submit', closePopup); 









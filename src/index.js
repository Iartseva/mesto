
import './pages/index.css';
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import {initialCards, selectorsForValidate, elementContainer, 
  popupEdit, popupImage, popupAdd,
  buttonEdit, buttonAdd, buttonSubmitAdd, formEdit, formAdd, 
  profileName, profileDescription} from "./utils/data.js";

// создание карточки 
function createCard(item) {
  const card = new Card(item, '#cards', showPopupImage);
    initialCardsList.addItem(card.generateCard());
  }

//добавление первоначальных карточек
const initialCardsList = new Section({ items: initialCards, 
  renderer: createCard},
  elementContainer);
    
initialCardsList.renderItems(initialCards);

//попап с картинками
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

function showPopupImage(name, link) {
  popupWithImage.open(name, link);
}

//попап добавления карточки
const popupAddCard = new PopupWithForm(popupAdd, (dataInputs) => {
  initialCardsList.renderer(dataInputs);
}); 

popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  validatorFormAddCard.cleanError();
  validatorFormAddCard.buttonDesable(buttonSubmitAdd);
  popupAddCard.open();
});

//попап редактирования профиля
const user = new UserInfo({NameSelector: profileName, DescriptionSelector: profileDescription});
const popupEditProfile = new PopupWithForm(popupEdit, (dataInputs) => {
  user.setUserInfo(dataInputs);
});

popupEditProfile.setEventListeners();

buttonEdit.addEventListener('click', () => {
  popupEditProfile.setInputValues(user.getUserInfo());
  validatorFormEditProfile.cleanError();
  popupEditProfile.open();
});

// включаем валидацию
const validatorFormEditProfile = new FormValidator(selectorsForValidate, formEdit);
const validatorFormAddCard = new FormValidator(selectorsForValidate, formAdd);

validatorFormEditProfile.enableValidation();
validatorFormAddCard.enableValidation();

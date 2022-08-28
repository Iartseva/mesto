
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
  inputTitlePlace, inputLink, inputName, inputDescription} from "./utils/data.js";

//добавление первоначальных карточек
const initialCardsList = new Section({ items: initialCards, 
  renderer: (item) => {
    const card = new Card(item.name, item.link, '#cards', showPopupImage);
        const newCard = card.generateCard();
        initialCardsList.addItem(newCard);
    }
    },
    elementContainer);
    
initialCardsList.renderItems(initialCards);

//попап с картинками
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

function showPopupImage(name, link) {
  popupWithImage.open(name, link);
}

//попап добавления карточки
const popupAddCard = new PopupWithForm(popupAdd, () => {
const card = {
  name: inputTitlePlace.value,
  link: inputLink.value,
  }
  initialCardsList.renderer(card);
}); 

popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  validatorFormAddCard.cleanError();
  validatorFormAddCard.buttonDesable(buttonSubmitAdd);
  popupAddCard.open();
});

//попап редактирования профиля
const popupEditProfile = new PopupWithForm(popupEdit, () => {
  user.setUserInfo({ name: inputName.value, description: inputDescription.value });
});

popupEditProfile.setEventListeners();
const user = new UserInfo({NameSelector: '.profile__name', DescriptionSelector: '.profile__description'});

buttonEdit.addEventListener('click', () => {
  const userData = user.getUserInfo();
  console.log(userData);
  inputName.value = userData.name;
  inputDescription.value = userData.description;
  validatorFormEditProfile.cleanError();
  popupEditProfile.open();
});

// включаем валидацию
const validatorFormEditProfile = new FormValidator(selectorsForValidate, formEdit);
const validatorFormAddCard = new FormValidator(selectorsForValidate, formAdd);

validatorFormEditProfile.enableValidation();
validatorFormAddCard.enableValidation();

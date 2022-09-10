
import "./pages/index.css";
import Api from "./components/API.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import popupDeleteCard from "./components/PopupDeleteCard.js";
import UserInfo from "./components/UserInfo.js";
import {selectorsForValidate, elementContainer, 
  popupEdit, popupImage, popupAdd, popupAvatar, popupDelete,
buttonEdit, buttonAdd, buttonAvatar, buttonSubmitAdd, 
formEdit, formAdd, formEditAvatar,
profileName, profileDescription, profileAvatar} from "./utils/data.js";
import { data } from "autoprefixer";

//создание экземпляра класса API
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: '9e47b405-e444-44ef-ada3-6d426edd111e',
    'Content-Type': 'application/json'
  }
});

//создание экземпляра класса Section
const initialCardsList = new Section({ 
  renderer: createCard},
  elementContainer);

//создание экземпляра класса User
const user = new UserInfo({NameSelector: profileName, DescriptionSelector: profileDescription, AvatarSelector: profileAvatar});

//данные пользователя с сервера
api.getUserInfo()
.then((data) => {
  user.setUserInfo(data);
})
.catch((err) => {
  console.log(err);
});

//первоначальные карточки с сервера
api.getInitialCard()
.then((data) => {
  initialCardsList.renderItems(data);;
})

// создание карточки 
function createCard(item) {
  const card = new Card(
    item,
    '#cards', 
    showPopupImage, 
    handleSetLike, 
    handleRemoveLike,
    handleDeleteCard);
    initialCardsList.addItem(card.generateCard());
  }

  function handleSetLike(cardId) {
    api.setLike(cardId)
    .then((data) => {
      this.handleLikeCard(data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

  function handleRemoveLike(cardId) {
    api.deleteLike(cardId)
    .then((data) => {
      this.handleLikeCard(data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

  function handleDeleteCard(cardId) {
    popupSubmitDelete.open();
    popupSubmitDelete.submitDelete(() => {
      api.deleteCard(cardId)
      .then(() => {
        popupSubmitDelete.close();
        this.deleteCard();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    })
  }
   
//попап добавления карточки
const popupAddCard = new PopupWithForm(popupAdd, (dataInputs) => {
  popupAddCard.renderLoading(true);
  api.addNewCard(dataInputs)
  .then((dataInputs) => {
    initialCardsList.renderer(dataInputs);
  })
  .finally(() => {
    popupAddCard.renderLoading(false);
  });
}); 

popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  validatorFormAddCard.cleanError();
  validatorFormAddCard.buttonDesable(buttonSubmitAdd);
  popupAddCard.open();
});
  
//попап с картинками
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

function showPopupImage(name, link) {
  popupWithImage.open(name, link);
}

//попап редактирования профиля 
const popupEditProfile = new PopupWithForm(popupEdit, (dataInputs) => {
  popupEditProfile.renderLoading(true);
  api.editProfile(dataInputs)
  .then((data) => {
    user.setUserInfo(data);
  })
  .finally(() => {
    popupEditProfile.renderLoading(false);
  });
});

popupEditProfile.setEventListeners();

buttonEdit.addEventListener('click', () => {
  popupEditProfile.setInputValues(user.getUserInfo());
  validatorFormEditProfile.cleanError();
  popupEditProfile.open();
});

//попап смены аватара
const popupEditAvatar = new PopupWithForm(popupAvatar,(dataInputs) => {
  popupEditAvatar.renderLoading(true);
  api.changeAvatar(dataInputs)
  .then((data) => {
    user.setAvatar(data);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupEditAvatar.renderLoading(false);
  });
  });

popupEditAvatar.setEventListeners();

buttonAvatar.addEventListener('click', () => {
  validatorFormEditAvatar.cleanError();
  popupEditAvatar.setInputValues(user.getUserInfo())
  popupEditAvatar.open();
})

// попап удаления карточки
const popupSubmitDelete= new popupDeleteCard(popupDelete);
popupSubmitDelete.setEventListeners();

// включаем валидацию
const validatorFormEditProfile = new FormValidator(selectorsForValidate, formEdit);
const validatorFormAddCard = new FormValidator(selectorsForValidate, formAdd);
const validatorFormEditAvatar = new FormValidator(selectorsForValidate, formEditAvatar)

validatorFormEditProfile.enableValidation();
validatorFormAddCard.enableValidation();
validatorFormEditAvatar.enableValidation();



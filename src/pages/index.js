import "../pages/index.css";
import Api from "../components/API.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import UserInfo from "../components/UserInfo.js";
import {selectorsForValidate, elementContainer, 
popupEdit, popupImage, popupAdd, popupAvatar, popupDelete,
buttonEdit, buttonAdd, buttonAvatar,
formEdit, formAdd, formEditAvatar,
profileName, profileDescription, profileAvatar} from "../utils/data.js";
import { data } from "autoprefixer";

let userId;

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

//первоначальные данные с сервера
Promise.all([api.getUserInfo(), api.getInitialCard()])
  .then(([userData, cards]) => {
    user.setUserInfo(userData);
    userId = userData._id;
    initialCardsList.renderItems(cards);
  })
  .catch(err => console.log(`Ошибка: ${err}`));

// создание карточки 
function createCard(item) {
  const card = new Card({
    data: item,
    templateSelector: '#cards', 
    showPopupImage: (name, link) => {
      popupWithImage.open(name, link);
    },
    handleSetLike: (cardId) => {
      api.setLike(cardId)
      .then((data) => {
        card.handleLikeCard(data);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
    }, 
    handleRemoveLike: (cardId) => {
      api.deleteLike(cardId)
      .then((data) => {
        card.handleLikeCard(data);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
    },
    handleDeleteCard: (cardId) => {
      popupSubmitDelete.open();
      popupSubmitDelete.setSubmitDelete(() => {
        api.deleteCard(cardId)
        .then(() => {
          card.deleteCard();
          popupSubmitDelete.close();
        })
        .catch(err => console.log(`Ошибка: ${err}`));
      })
    },
    userId: userId
  });
    initialCardsList.addItem(card.generateCard());
  }
   
//попап добавления карточки
const popupAddCard = new PopupWithForm(popupAdd, (dataInputs) => {
  popupAddCard.renderLoading(true);
  api.addNewCard(dataInputs)
  .then((dataInputs) => {
    initialCardsList.renderer(dataInputs);
    popupAddCard.close();
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  .finally(() => {
    popupAddCard.renderLoading(false);
  });
}); 

popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  validatorFormAddCard.cleanError();
  validatorFormAddCard.disableButton();
  popupAddCard.open();
});

//попап редактирования профиля 
const popupEditProfile = new PopupWithForm(popupEdit, (dataInputs) => {
  popupEditProfile.renderLoading(true);
  api.editProfile(dataInputs)
  .then((data) => {
    user.setUserInfo(data);
    popupEditProfile.close();
  })
  .catch(err => console.log(`Ошибка: ${err}`))
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
    user.setUserInfo(data);
    popupEditAvatar.close();
  })
  .catch(err => console.log(`Ошибка: ${err}`))
  .finally(() => {
    popupEditAvatar.renderLoading(false);
  });
  });

popupEditAvatar.setEventListeners();

buttonAvatar.addEventListener('click', () => {
  validatorFormEditAvatar.cleanError();
  validatorFormEditAvatar.disableButton();
  popupEditAvatar.open();
})

// попап удаления карточки
const popupSubmitDelete= new PopupDeleteCard(popupDelete);
popupSubmitDelete.setEventListeners();
  
//попап с картинками
const popupWithImage = new PopupWithImage(popupImage);
popupWithImage.setEventListeners();

// включаем валидацию
const validatorFormEditProfile = new FormValidator(selectorsForValidate, formEdit);
const validatorFormAddCard = new FormValidator(selectorsForValidate, formAdd);
const validatorFormEditAvatar = new FormValidator(selectorsForValidate, formEditAvatar)

validatorFormEditProfile.enableValidation();
validatorFormAddCard.enableValidation();
validatorFormEditAvatar.enableValidation();



const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');

const buttonEdit = document.querySelector('.profile__edit-button'); //кнопка открытия
const buttonAdd = document.querySelector('.profile__add-button');//кнопка открытия
const buttonsClose = document.querySelectorAll('.popup__button-close');//кнопки закрытия
const buttonSubmitAdd = document.querySelector('#button-submit-add');//кнопка сабмита добавления карточки

const forms = document.querySelectorAll('.popup__form');
const formEdit = document.querySelector('.popup__form_type_edit-profile');//форма редактирования
const formAdd = document.querySelector('.popup__form_type_add-card');//форма добавления карточки

const inputName = document.querySelector('.popup__input_type_name'); 
const inputDescription = document.querySelector('.popup__input_type_role'); 
const profileName = document.querySelector('.profile__name'); 
const profileDescription = document.querySelector('.profile__description');
const inputTitlePlace = document.querySelector('.popup__input_type_place'); 
const inputLink = document.querySelector('.popup__input_type_link');

const cardsContainer = document.querySelector('.elements');

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
  cleanError();
});
buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  formAdd.reset();
  cleanError();
  buttonSubmitAdd.setAttribute('disabled', true);
  buttonSubmitAdd.classList.add('popup__button-submit_disabled');
});
buttonsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
  });

//редактирование профиля
function editProfile(evt) { 
  evt.preventDefault();  
  profileName.textContent = inputName.value; 
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEdit);  
} 

formEdit.addEventListener('submit', editProfile);

//значения формы редактирования профиля
function createValue() {
  inputName.value = profileName.textContent; 
  inputDescription.value = profileDescription.textContent; 
}

//создание карточки
function createCard(item) {
  const cardTemplate = document.querySelector('#cards').content;
  const element = cardTemplate.querySelector('.element');
  const card = element.cloneNode(true);
  const imageElement = card.querySelector('.element__image');
  imageElement.src = item.link; 
  imageElement.alt = item.name; 
  card.querySelector('.element__like').addEventListener('click', createLike);
  card.querySelector('.element__delete').addEventListener('click', deleteCard);
  card.querySelector('.element__title').textContent = item.name; 
  imageElement.addEventListener('click', showPopupImage);
 
  return card;
}

//добавление карточки на страницу через форму
function addCard(evt) {
  evt.preventDefault();
  const newCardName = inputTitlePlace.value;
  const newCardImage = inputLink.value;
  cardsContainer.prepend(createCard({name: newCardName, link: newCardImage}));
  closePopup(popupAdd);
}

formAdd.addEventListener('submit', addCard);

//добавление первоначальных карточек
const initialCards = [
  {name: 'Архыз', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  {name: 'Челябинская область', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  {name: 'Иваново', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  {name: 'Камчатка', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  {name: 'Холмогорский район', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  {name: 'Байкал', link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
]; 

initialCards.forEach((el) => {const card = createCard(el); 
cardsContainer.append(card)});

//попап с картинками
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

function showPopupImage(evt) {
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  caption.textContent = evt.target.alt;
  openPopup(popupImage);
}

//лайки
function createLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

//удаление карточки
function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

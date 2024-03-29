class Api {
  constructor({url, headers})  { 
    this._url = url; 
    this._headers = headers; 
}

//проверка ответа
_checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

// загрузка данных о пользователе
getUserInfo() {
  return fetch(`${this._url}/users/me`, {
    headers: this._headers
  })
  .then(this._checkResponse)
}

//загрузка первоначальных карточек
getInitialCard() {
  return fetch(`${this._url}/cards`, {
    headers: this._headers
  })
  .then(this._checkResponse)
}

//изменение информации профиля
editProfile(data) {
  return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.description
    })
  })
  .then(this._checkResponse)
}

//смена аватара
changeAvatar(data) {
  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: data.avatar
    }),
    headers: this._headers
  })
  .then(this._checkResponse)
}

//добавление карточки
addNewCard(data) {
  return fetch(`${this._url}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
  .then(this._checkResponse)
}

//добавление лайка
setLike(cardId) {
  return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: this._headers
  })
  .then(this._checkResponse)
}

//удаление лайка
deleteLike(cardId) {
  return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: this._headers
  })
  .then(this._checkResponse)
}

//удаление карточки
deleteCard(cardId) {
  return fetch(`${this._url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this._headers
  })
  .then(this._checkResponse)
}
}
export default Api;
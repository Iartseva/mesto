class UserInfo {
  constructor({NameSelector, DescriptionSelector, AvatarSelector}) {
    this._name = document.querySelector(NameSelector); 
    this._description = document.querySelector(DescriptionSelector);
    this._avatar = document.querySelector(AvatarSelector);
  }

  getUserInfo() {
    return { 
      name: this._name.textContent, 
      description: this._description.textContent,
      avatar: this._avatar.src,
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
    this._avatar.src = data.avatar;
    this._avatar.alt = data.name;
  }

  setAvatar(data) {
    this._avatar.src = data.avatar;
    this._avatar.alt = data.name;
  }
}

export default UserInfo;
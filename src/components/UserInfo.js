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
    ({name: this._name.textContent, 
      about: this._description.textContent, 
      avatar: this._avatar.src} = data);
  }
}

export default UserInfo;
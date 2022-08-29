class UserInfo {
  constructor({NameSelector, DescriptionSelector}) {
    this._name = document.querySelector(NameSelector); 
    this._description = document.querySelector(DescriptionSelector);
  }

  getUserInfo() {
    return { 
      name: this._name.textContent, 
      description: this._description.textContent,
    }
  }

  setUserInfo(data) {
    ({name: this._name.textContent, description: this._description.textContent } = data);
  }
}

export default UserInfo;
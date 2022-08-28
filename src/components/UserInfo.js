class UserInfo {
  constructor({NameSelector, DescriptionSelector}) {
    this._name = document.querySelector(NameSelector); 
    this._description = document.querySelector(DescriptionSelector);
  }

  getUserInfo() {
    return { 
      name: this._name.textContent, 
      description: this._description.textContent};
  }

  setUserInfo({name, description}) {
    this._name.textContent = name;
    this._description.textContent = description;
}
}

export default UserInfo;
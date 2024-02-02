export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
  }

  setUserInfo(userName, userDescription) {
    this._nameElement.textContent = userName;
    this._descriptionElement.textContent = userDescription;
  }

  setAvatar(link) {
    // set src of avatar. just one line. 
   // look at whats been documented, and looks like set userInfo code but set to avatar link source 

  //  this._avatarLink.updateAvatar = link; ??

  }
}






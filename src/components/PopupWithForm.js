import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super(modalSelector);
    this._form = this._popupElement.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this.setEventListeners();
  }

  reset() {
    this._form.reset();
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(userInfo) {
    //userInfo.name, userInfo.description
    const userArray = Object.values(userInfo);
    for (let i = 0; i < userArray.length; i++) {
      this._inputList[i].value = userArray[i];
    }
  }

  //   // Find the submit button in the form by class name
  // const submitButton = updateAvatarForm.querySelector(".modal__button");
  // // Update the text before making the API call
  // submitButton.textContent = "Saving...";

  setButtonText(buttonText) {
    this._form.querySelector(".modal__button").textContent = buttonText;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      //this.close();
    });
    super.setEventListeners();
  }
}

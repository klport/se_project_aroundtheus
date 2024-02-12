import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;

    this.setEventListeners();
  }

  setSubmitHandler(handler) {
    this._handleFormSubmit = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    // sets event listeners - adds a click event listener to the close icon of the popup.
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  setButtonText(buttonText) {
    this._form.querySelector(".modal__button").textContent = buttonText;
  }

  reset() {
    this._form.reset();
  }
}

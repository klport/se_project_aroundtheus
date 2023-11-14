export default class Popup {
  constructor(modalSelector) {
    this._popupElement = document.querySelector(modalSelector);
    this._closeButton = this._popupElement.querySelector(".modal__close");
  }

  open() {
    console.log(this);
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("mousedown", this._handleModalClick);
  }

  close() {
    // closes popup

    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);

    // document.removeEventListener("keydown", closeByEscape);
    // modal.removeEventListener("mousedown", handleModalClick);
  }

  _handleModalClick = (event) => {
    if (event.target.classList.contains("modal_opened")) {
      // closeModal(event.target);
      this.close();
    }
  };

  _handleEscClose = (evt) => {
    console.log(this);
    // listens for esc button - why is it private?
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    // sets event listeners - adds a click event listener to the close icon of the popup.
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target === this._popupElement ||
        evt.target === this._closeButton
      ) {
        this.close();
      }
    });
  }
}

import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor ( popupSelector, handleFromSubmit ) {
      super({ popupSelector });
      this._popupElement.querySelector(".modal__form");
      this._handleFormSubmit = handleFromSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close()
  }
}

// index.js

const newCardPopup = new PopupWithForm ('#edit-modal', () => {});
newCardPopup.open()

newCardPopup.close();
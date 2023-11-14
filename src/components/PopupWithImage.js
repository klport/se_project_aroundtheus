import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__image");
    this._caption = this._popupElement.querySelector(".modal__text");
  }

  
}

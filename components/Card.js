export default class Card {
  constructor({ name, link }, cardSelector) {
    this._namename = name;
    this._linklink = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    //.card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    //".card__delete-button"
    this._deleteButton = this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      })
  }

_handleDeleteCard(){
  this._cardElement.remove(); 
   
}

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    //get the card view
    //set event listenner
    this._setEventListeners();
    //return the card
  }
}

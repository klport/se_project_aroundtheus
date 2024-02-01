export default class Card {
  constructor(
    { _id, name, link },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
  ) {
    this._id = _id; 
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
  }

  _setEventListeners() {
    //.card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    //".card__delete-button"

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
   
      // call the api to delete the card - VIA LOOSE COUPLING - call it in the index.js in the handleDelete function
      // if success, call the _handleDeleteCard()
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  handleDeleteCardLocally() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    //get the card view

    this._likeButton = this._cardElement.querySelector(".card__like-button");

    //set event listenner
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}

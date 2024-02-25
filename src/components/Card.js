export default class Card {
  constructor(
    { _id, name, link, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    handleUnlikeClick
  ) {
    this.id = _id;
    this._name = name;
    this._link = link;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._handleUnlikeClick = handleUnlikeClick;
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

    this._likeButton.addEventListener("click", () => {
      // check the isLiked property. If false (button is unliked curently), we like button. If true, we unlike button
      if (this.isLiked) {
        this._handleUnlikeClick(this);
      } else {
        this._handleLikeClick(this);
      }
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

  // _handleLikeIcon() {
  //   this._likeButton.classList.toggle("card__like-button_active");
  // }

  addLike() {
    this.isLiked = true;
    this._likeButton.classList.add("card__like-button_active");
  }
  removeLike() {
    this.isLiked = false;
    this._likeButton.classList.remove("card__like-button_active");
  }

  getView() {
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;

    //get the card view

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    //run on page load; call this w/in this class on page load
    this._setLikeButtonState();
    //set event listenner
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }

  //check isLiked property. If true fill in the button, if false, unlike the button
  _setLikeButtonState() {
    this.isLiked ? this.addLike() : this.removeLike();
  }
}

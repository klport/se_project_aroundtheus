export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name;
    this._link;
    this._cardSelector = cardSelector;
  }
  _setEventListeners() {
    //alert('You did it!'); not not working
    //".card__like-button"
     this._cardElement.querySelector('.card__like-button').addEventListener('click', () => {
  });

    console.log()
    //".card__delete-button"
    const deleteButton = this._cardElement.querySelector('.card__delete-button')
  }
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    console.log(this._cardElement); //this console.log doesnt work
    //get the card view
    //set event listeners
    this._setEventListeners();
    //return the card
  }
}

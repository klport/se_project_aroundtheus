import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
//import avatarSrc from "./images/jacques-cousteau(1).jpg";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";

import Api from "./API.js";

//API

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "921767a7-5253-4397-9674-d9dd7ed6801d",
    "Content-Type": "application/json",
  },
});

//Elements
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
//const addCardModal = document.querySelector("#add-card-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = document.querySelector("#add-card-form");
//const previewImageModal = document.querySelector("#previewImageModal");
const modalImage = document.querySelector("#modalImage");
const modalText = document.querySelector("#modalText");

// Buttons and Other DOM nodes

const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = editProfileModal.querySelector(".modal__close");
const addCardModalCloseButton = document.querySelector(
  "#add-card-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const closePreviewImageButton = document.querySelector("#previewCloseBtn");

//Form Data
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);

//objects

const profileFormValidator = new FormValidator(config, profileFormElement);

const addFormValidator = new FormValidator(config, addCardFormElement);

const profileEditModal = new PopupWithForm(
  "#edit-modal",
  handleProfileFormSubmit
);

const addCardModal = new PopupWithForm("#add-card-modal", handleCardAddSubmit);

export const previewImageModal = new PopupWithImage("#previewImageModal");

// call setEventListeners

const profileUserInfo = new UserInfo(
  ".profile__title",
  ".profile__description"
);

//functions

function handleProfileFormSubmit(formData) {
  //fetch request to change the name and description on the server
  api
    .updateUserInfo(formData)
    .then((res) => {
      profileUserInfo.setUserInfo(res.name, res.about);
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to change user info");
    });
  console.log(formData);
}

function handleCardAddSubmit(inputValues) {
  const cardData = { name: inputValues.title, link: inputValues.url };

  api.addCard(cardData).then((res) => {
    const cardElement = createCard(res);
    cardSection.addItem(cardElement);
    addFormValidator.resetValidation();
  })

}

function handleImagePreview(name, link) {
  previewImageModal.open(name, link);
}

//event listeners
profileEditButton.addEventListener("click", () => {
  const userInfo = profileUserInfo.getUserInfo();
  profileFormValidator.resetValidation();
  profileEditModal.setInputValues(userInfo);
  profileEditModal.open();
});

// Add new card button
addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  addCardModal.open();
});

//event listeners

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImagePreview);
  return card.getView();
}

//Initialization

profileFormValidator.enableValidation();
addFormValidator.enableValidation();

// //Gets user info from api and sets it locally on the page - runs on page load. sets it locally
api
  .getUserInfo()
  .then((data) => {
    profileUserInfo.setUserInfo(data.name, data.about);
  })
  .catch((err) => {
    console.error(err);
    alert("Failed to load user info");
  });

let cardSection; // default value is undefined;

//Gets initial cards from api
api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      { items: cards, renderer: createCard },
      ".cards__list"
    );

    cardSection.renderItems();
  })
  .catch(); // initial respone is supposed to be empty

//Edit The Profile ???
// api
//   .updateUserInfo({ title: "Some Title", description: "Some Description" })
//   .then((data) => {});


//get initial cards 
//delete cards
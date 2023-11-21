import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
//import avatarSrc from "./images/jacques-cousteau(1).jpg";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";
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
// const cardTitleInput = addCardFormElement.querySelector(
//   ".modal__input_type_title"
// );
//const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

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

const cardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

//functions

function handleProfileFormSubmit(formData) {
  console.log(formData);
  profileUserInfo.setUserInfo(formData.title, formData.description);
}

function handleCardAddSubmit(inputValues) {
  const cardData = { name: inputValues.title, link: inputValues.url };
  cardSection.addItem(cardData);
  addFormValidator.resetValidation();
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
profileEditModal.setEventListeners();
cardSection.renderItems();

const card = new Card(initialCards[0], "#card-template", () => {
  console.log("call image");
});
console.log(card);

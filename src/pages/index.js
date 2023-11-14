import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from '../components/UserInfo.js';
import "./index.css";
//import avatarSrc from "./images/jacques-cousteau(1).jpg";
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';




const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

//Wrapppers
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

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: ".modal_error_visible",
};

const profileFormValidator = new FormValidator(config, profileFormElement);

const addFormValidator = new FormValidator(config, addCardFormElement);

const profileEditModal = new PopupWithForm(
  "#edit-modal",
  handleProfileFormSubmit
);

const addCardModal = new PopupWithForm("#add-card-modal", handleCardAddSubmit);

const previewImageModal = new PopupWithImage("#previewImageModal");

const profileUserInfo = new UserInfo(".profile__title", ".profile__description");

const cardSection = new Section({ items:initialCards, renderer: createCard}, ".cards__list");

//functions
function handleProfileFormSubmit(formData) {
  console.log(formData);
}
const handleModalClick = (event) => {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  }
};

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
  modal.removeEventListener("mousedown", handleModalClick);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
  modal.addEventListener("mousedown", handleModalClick);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

// function handleProfileFormSubmit() {
//   profileTitle.textContent = nameInput.value;
//   profileDescription.textContent = jobInput.value;
// }

function handleCardAddSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: cardTitleInput.value, link: cardUrlInput.value };
  const cardElement = createCard(cardData);
  cardsWrap.prepend(cardElement);

  closeModal(addCardModal);
  addCardFormElement.reset();
}

function handleImagePreview(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  modalText.textContent = name;
  openModal(previewImageModal);
}

//event listeners
profileFormElement.addEventListener("submit", handleProfileFormSubmit);
profileEditButton.addEventListener("click", () => {
  const user = profileUserInfo.getUserInfo();
  console.log(user)
  nameInput.value = user.name;
  jobInput.value = user.description;
  // openModal(editProfileModal);
  profileFormValidator.resetValidation();
  profileEditModal.open();
});

// profileModalCloseButton.addEventListener("click", () =>
//   closeModal(editProfileModal)
// );

// Add new card button
addNewCardButton.addEventListener("click", () => {
  addFormValidator.toggleButtonState();
  openModal(addCardModal);
});
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

//

//Form listeners

addCardFormElement.addEventListener("submit", handleCardAddSubmit);

closePreviewImageButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImagePreview);
  return card.getView();
  
}

//Initialization

// initialCards.forEach((cardData) => {
//   const cardElement = createCard(cardData);
//   cardsWrap.append(cardElement);
// });

profileFormValidator.enableValidation();
addFormValidator.enableValidation();
profileEditModal.setEventListeners();
cardSection.renderItems();
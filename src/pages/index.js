import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
//import avatarSrc from "./images/jacques-cousteau(1).jpg";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";

import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/API.js";

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

const updateAvatarForm = document.querySelector("#change-profile-picture-form");

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

const editAvatarModal = new PopupWithForm(
  "#change-profile-picture-modal",
  handleAvatarFormSubmit //create a function of this name that runs after I submit the form//
);

const avatarUpdateValidator = new FormValidator(config, updateAvatarForm);

const deleteConfirmationModal = new PopupWithConfirmation(
  "#delete-confirmation-modal"
);

const addCardModal = new PopupWithForm("#add-card-modal", handleCardAddSubmit);

export const previewImageModal = new PopupWithImage("#previewImageModal");

// call setEventListeners

const profileUserInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

//functions

function handleProfileFormSubmit(formData) {
  //fetch request to change the name and description on the server
  profileEditModal.setButtonText("Saving...");
  //profileEditModal.reset();
  api

    .updateUserInfo(formData)
    .then((res) => {
      profileUserInfo.setUserInfo(res.name, res.about);
      profileEditModal.close();
      //modal__form.reset();
    })

    .catch((err) => {
      console.error(err);
      alert("Failed to change user info");
      console.log(formData);
    })
    .finally(() => {
      profileEditModal.setButtonText("Save");
    });
}

function handleCardAddSubmit(inputValues) {
  const cardData = { name: inputValues.title, link: inputValues.url };
  addFormValidator.resetValidation();
  addCardModal.setButtonText("Saving...");
  api
    .addCard(cardData)
    .then((res) => {
      const cardElement = createCard(res);
      cardSection.addItem(cardElement);
      addCardModal.close();
    })
    .finally(() => {
      addCardModal.setButtonText("Save");
    });
}

function handleLikeClick(card) {
  console.log("like card is running");
  // call the api and pass card.id and card.isLiked
  api
    .updateCardLike(card.id, card.isLiked)
    .then(() => {
      card.addLike();
      //card.isLiked = true;

      //card.setLikeButtonState();
    })
    .catch((err) => {
      console.error(err);
      alert(`${err} Failed to like card`);
    });

  // after api is successful, we can then update the UI
}

function handleUnlikeClick(card) {
  console.log("unlike card is running");
  api
    .updateCardLike(card.id, card.isLiked)
    .then(() => {
      card.removeLike();
      //card.isLiked = false;

      //card.setLikeButtonState();
    })
    .catch((err) => {
      console.error(err);
      alert(`${err} Failed to unlike card`);
    });
}

function handleImagePreview(name, link) {
  previewImageModal.open(name, link);
}
//runs when clicking the trash button
function handleDeleteClick(card) {
  //runs when clicking the yes button
  function deleteCard() {
    //delete the card on the server.
    deleteConfirmationModal.setButtonText("Deleting");
    api
      .deleteCard(card.id)
      .then(() => {
        //closes modal
        deleteConfirmationModal.close();
        //deletes card on the UI
        card.handleDeleteCardLocally();
      })
      .catch((err) => {
        console.error(err);
        alert(`${err} Failed to delete card`);
      })

      .finally(() => {
        deleteConfirmationModal.setButtonText("Delete");
      });
  }
  deleteConfirmationModal.open();
  deleteConfirmationModal.setSubmitHandler(deleteCard);
}

const avatarButton = document.querySelector(".profile_image_edit_button");

avatarButton.addEventListener("click", () => {
  editAvatarModal.open();
});

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
  const card = new Card(
    cardData,
    "#card-template",
    handleImagePreview,
    handleDeleteClick,
    handleLikeClick,
    handleUnlikeClick
  );
  return card.getView();
}

//Initialization

profileFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarUpdateValidator.enableValidation();

// //Gets user info from api and sets it locally on the page - runs on page load. sets it locally
api
  .getUserInfo()
  .then((data) => {
    profileUserInfo.setUserInfo(data.name, data.about);
    profileUserInfo.setAvatar(data.avatar);
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
    console.log(">>CARDS", cards);
    cardSection = new Section(
      { items: cards, renderer: createCard },
      ".cards__list"
    );

    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
    alert("Failed to load cards");
  });

//Update Likes

// function {
//   api.updateCardLike();

// }

//Edit The Profile Avatar
function handleAvatarFormSubmit(inputValues) {
  editAvatarModal.setButtonText("Saving...");
  api

    .updateAvatar(inputValues)
    .then((res) => {
      console.log(res);
      profileUserInfo.setAvatar(res.avatar);
      editAvatarModal.close();
      //modal__form.reset();

      // const modal__form = document.getElementById(
      //   "change-profile-picture-form"
      // );
    })
    .catch((error) => {
      console.log(error);
      alert(`failed to change avatar ${error}`);
    })
    .finally(() => {
      editAvatarModal.setButtonText("Save");
    });
}

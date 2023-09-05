// enabling validation by calling enableValidation()
// pass all the settings on call
//formEls = form elements
//`Array` doesnt have to be defined. It is provided by the browser
//Array.from()  static method creates a new, shallow-copied Array instace from an array-like or iterable object.
/// `...` is a Spread operator. It is expecting that whatever is next to it is an array or arry -like object and grabs the contents (each of the items) and makes a copy

//syntatic sugar
//object destructuring?

function showInputError(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function checkInputValidity() {}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
    console.log(inputEl);
  });
});

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
    // look for all inputs inside of form
    //loop through all the inputs to see if all are valid.
    // in input is !valid
    //get validation message
    //add error class to input
    //display error message
    //disable button
    //if all inputs are valid
    //enable button
    //reset error messages
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: ".modal__input_error",
  errorClass: "popup__error_visible", //i think i still have to add this class
};

enableValidation(config);

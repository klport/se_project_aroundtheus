export class FormValidator {
  constructor (settings, formElement) {
    this._inputSelector = settings.inputSelector ;  
    this._submitButtonSelector = settings.submitButtonSelector ; 
    this._inactiveButtonClass = settings.inactiveButtonClass ;  
    this._inputErrorClass = settings.inputErrorClass ;  
    this._errorClass = settings.errorClass;  

    this._formEl = formElement;
  }

 toggleButtonState (){
  
 }

setEventListeners() {
  this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
  this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
  this._inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      this._checkInputValidity(inputEl);
      this._toggleButtonState(submitButton); 
    });
  });
}

 
checkInputValidity() {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  this._hideInputError(formEl, inputEl, options);
}


 enableValidation(){
  this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
 }
}

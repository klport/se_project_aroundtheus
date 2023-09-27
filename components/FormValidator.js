class FormValidator {
 constructor (settings, formElement) {
  this._inputSelector = settings.inputSelector ;  
  this._submitButtonSelector = settings.submitButtonSelector ; 
  this._inactiveButtonClass = settings.inactiveButtonClass ;  
  this._inputErrorClass = settings.inputErrorClass ;  
  this._errorClass = settings.errorClass;  

  this._form = formElement;
 }

 toggleButtonState (){
  
 }

 

_setEventListener () {
 this._inputList = Array.from(this.form.querySelectorAll(this.inputSelector))
 this._buttonElement = this.form.querySelector(this._submitButtonSelector))
  
})

 enableValidation(){
  this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
 }
}


const editFormValidator = new FormValidator();
editFormValidator.enableValidation();
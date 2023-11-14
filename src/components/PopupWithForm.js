import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor ( modalSelector, handleFormSubmit ) {
      super( modalSelector );
      this._form = this._popupElement.querySelector('.modal__form')
      this._inputList = this._form.querySelectorAll(".modal__input");
      this._handleFormSubmit = handleFormSubmit; 
  }

  _getInputValues(){

  const formValues = {};   
  this._inputList.forEach(input => {
    return formValues[input.name] = input.value;

   
  }); 
  return formValues
  }


  setEventListeners(){
    this._form.addEventListener('submit',(evt)=>{
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues());
      this.close()
    })
    super.setEventListeners();
  }
}





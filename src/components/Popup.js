export default class Popup {
 constructor({ popupSelector}){
  this._popupElement = document.querySelector(popupSelector);
 }

 open(){
  //opens popup
 }

 close() {
   // closes popup
 }

 _handleEscClose (){
   // listens for esc button - why is it private?
 }

 setEventListeners(){
   // sets event listeners - adds a click event listener to the close icon of the popup. 

 }

}
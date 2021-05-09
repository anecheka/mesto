import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelector('.form');
        this._inputList.inputErrorClass = this._popup.querySelectorAll('.form__input-error-message');
        }

    
    //Перезаписывает родительский метод setEventListeners. 
    //Добавляю вызов функции при сабмите
    setEventListeners () {
        super.setEventListeners();
        this._inputList.addEventListener('submit', (evt) => {
            evt.preventDefault ();
            this._handleFormSubmit ();
            this.close();
        })
    }

    //Метод переопределения функции при нажатии на кнопку сабмита
    setActionForConfirmation (action) {
        this._handleFormSubmit = action;
    }
}
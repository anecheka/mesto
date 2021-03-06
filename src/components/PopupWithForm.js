import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._popup.querySelector('.form');
        this._inputList.inputErrorClass = this._popup.querySelectorAll('.form__input-error-message');
        }
    
    _getInputValues () {
            this._inputValues = {}
            this._inputList.querySelectorAll('.form__input')
            .forEach ((inputElement) => {
                this._inputValues[inputElement.name] = inputElement.value
            });
            return this._inputValues;
        }
    
    //Перезаписывает родительский метод setEventListeners. 
    //Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, 
    //но и добавлять обработчик сабмита формы.
    setEventListeners () {
        super.setEventListeners();
        this._inputList.addEventListener('submit', (evt) => {
            evt.preventDefault ();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    //Перезаписывает родительский метод close, 
    //так как при закрытии попапа форма должна ещё и сбрасываться.

    close () {
        this._inputList.reset();
        this._inputList.inputErrorClass
        .forEach ((inputError) => { 
            inputError.textContent = ''; 
        }); 
        super.close(); 
    }
}
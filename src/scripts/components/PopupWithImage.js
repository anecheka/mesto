import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        }
    
    open ({link, name}) {
        super.setEventListeners();

        this._popup.querySelector('.popup__full-photo').src = link;
        this._popup.querySelector('.popup__full-photo').alt = name;
        this._popup.querySelector('.popup__full-photo-title').textContent = name;

        super.open();

    }
}
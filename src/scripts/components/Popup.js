export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        }

    //Публичный метод open, которые отвечает за открытие попапа.
    open () {
        this._popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    //Публичный метод close, которые отвечает за закрытие попапа.
    close () {
        this._popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }
    
    //Приватный метод, который содержит логику закрытия попапа клавишей Esc.
    _handleEscClose () {
        document.addEventListener('keydown', (evt) => {
                if (evt.key === 'Escape') {
                this.close();
                };
        });
    }
    
    //Публичный метод, который добавляет слушатель клика иконке закрытия попапа.
    setEventListeners () {
        this._handleEscClose();

        this._popup.querySelector('.close-icon').addEventListener('click', () => {
            this.close();
        });
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_is-opened')) {
                this.close();
                };
        });
    }
}
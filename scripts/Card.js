import { openPopup, popupViewFullPhoto } from './utils.js'

class Card {

//Конструктор с данными карточками и селектором template-а
    constructor(data, cardSelector) {
      this._name = data.name;
      this._image = data.link;
      this._imageAlt = data.name;
      this._cardSelector = cardSelector;
    }

//Приватный метод создания карточки
    _getTemplate() {
      const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return cardElement;
      
    }

//Приватный метод для слушателя клика по кнопке лайка
    _likeButtonClicked() {
        this._element
        .querySelector('.element__like-button')
        .classList
        .toggle('element__like-button_active');
    }

//Приватный метод для слушателя удаления 
    _deleteButtonClicked() {
        this._element.remove();
    }

//Приватный метод для слушателей событий 
    _setEventListeners() {
    
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
        this._likeButtonClicked();
        });

        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._deleteButtonClicked();
            });        

        this._element.querySelector('.element__photo').addEventListener ('click', () => {
            openPopup(popupViewFullPhoto);
            document.querySelector('.popup__full-photo').src = this._image;
            document.querySelector('.popup__full-photo').alt = this._imageAlt; 
            document.querySelector('.popup__full-photo-title').textContent = this._name;
              });
    }

/*Публичный метод, который возвращает полностью работоспособный 
наполненный данными элемент карточки*/

    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.element__title').textContent = this._name;
      this._element.querySelector('.element__photo').src = this._image;
      this._element.querySelector('.element__photo').alt = this._imageAlt;
  
      return this._element;
    }
}

export { Card }
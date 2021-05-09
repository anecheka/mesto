export default class Card {

//Конструктор с данными карточки и селектором template-а
    constructor(item, handleCardClick, handleLikeClick, handleDislikeClick, handleDeleteClick, cardSelector, userID) {
      this._name = item.name;
      this._image = item.link;
      this._imageAlt = item.name;
      this._id = item._id;
      this._ownerID = item.owner._id;
      this._likes = item.likes;
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
      this._handleDislikeClick = handleDislikeClick;
      this._handleDeleteClick = handleDeleteClick;
      this._userID = userID;
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

//Метод для слушателя клика по кнопке лайка (лайк)
    _likeButtonClicked() {
        this._element
        .querySelector('.element__like-button')
        .classList
        .toggle('element__like-button_active');
    }

//Публичный метод для удаления карточки из разметки
    deleteButtonClicked () {
        this._element.remove();
        this._element = null;
    }

//Приватный метод для слушателей событий 
    _setEventListeners() {
    
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
        this._renderLikeElement();
        });

        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._handleDeleteClick();
            });        

        this._element.querySelector('.element__photo').addEventListener('click', () => { 
            this._handleCardClick();
        });
    }

//Метод для определения, является ли владельцем фотографии текущий пользователь 
    _isOwner() {
        return this._ownerID === this._userID;
    }

//Публичный метод, который возвращает полностью работоспособный 
//наполненный данными элемент карточки

    generateCard() {
      this._element = this._getTemplate();
    
      this._setEventListeners();
      this._element.querySelector('.element__title').textContent = this._name;
      this._element.querySelector('.element__photo').src = this._image;
      this._element.querySelector('.element__photo').alt = this._imageAlt;
      
      if (!this._isLiked()) {
        this._element
        .querySelector('.element__like-button')
        .classList
        .remove('element__like-button_active');

        } else if (this._isLiked()) {
            this._element
            .querySelector('.element__like-button')
            .classList
            .add('element__like-button_active');
        }

      if(!this._isOwner()) {
        this._element
        .querySelector('.element__delete-button')
        .remove();
      }
        
      this._element.querySelector('.element__like-number').textContent = this._likes.length;
      return this._element;
    }

    //Метод для определения, поставил ли лайк текущий пользовател 
    _isLiked () {
        return this._likes.some((data) => {
            return data._id === this._userID
        })
    }

    //Метод для простановки лайка карточкам текущего пользователя 
    _renderLikeElement () {
        if (this._isLiked () === false) {
        this._handleLikeClick() 
        } else if (this._isLiked () === true) {
        this._handleDislikeClick()
        }
    }

    _updateLikesView () {
        this._element.querySelector('.element__like-number').textContent = this._likes.length;
        this._likeButtonClicked();
    }

    setLikesInfo(data) {
        this._likes = data;
        this._updateLikesView();
    }

}
const clickEditButton = document.querySelector('#edit-profile'); //Переменная для кнопки редактирования профиля
const popupEditProfile = document.querySelector('.popup.popup_use_edit-profile'); //Переменная для попапа c редактированием профиля
const newUsername = document.querySelector('#username'); //Переменная для инпута с именем пользователя
const newBio = document.querySelector('#bio'); //Переменная для инпута с биографией
const currentUsername = document.querySelector('.profile__username'); //Переменная с именем пользователя в профиле на странице 
const currentBio = document.querySelector('.profile__bio'); //Переменная с био пользователя в профиле на странице
const closePopupEditProfile = document.querySelector('#close-popup-edit-profile'); //Переменная для кнопки-крестика в попапе редактирования профиля
const formEditProfile = document.querySelector('.form.form_function_edit-profile'); //Переменная для формы редактирования профиля

const clickAddPhoto = document.querySelector('#add-element'); //Переменная для кнопки добавления фото
const popupAddPhoto = document.querySelector('.popup.popup_use_add-photo'); //Переменная для попапа добавления карточки
const newPhotoLocationTitle = document.querySelector('#location-name'); //Переменная для названием места в форме добавления карточки
const newPhotoImageUrl = document.querySelector('#photo-url'); //Переменная для поля с ссылкой на фото в форме добавления карточки
const closePopupAddPhoto = document.querySelector('#close-popup-add-photo'); //Переменная для кнопки-крестика в попапе добавления фото
const formAddPhoto = document.querySelector('.form.form_function_add-photo'); //Переменная для формы редактирования профиля
const inputErrorMessage = formAddPhoto.querySelectorAll('.form__input-error-message'); //Переменная сообщения об ошибке в попапе (нужна для обнуления сообщения об ошибке при повторном открытии попапа)
const photoGallery = document.querySelector('.elements'); //Переменная для фотопотока пользователя

//Константа попапа фулвью фото
const popupViewFullPhoto = document.querySelector('.popup.popup_use_view-full-photo');

//Константа фотографии фулвью фото
const popupViewFullPhotoImage = popupViewFullPhoto.querySelector('.popup__full-photo');

//Константа заголовка к фотографии фулвью фото 
const popupViewFullPhotoCaption = popupViewFullPhoto.querySelector('.popup__full-photo-title');

//Переменная крестика попапа фул вью
const closePopupViewFullPhoto = document.querySelector('#close-popup-view-full-photo');

//Массив фотографий для страницы 
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

//Объект со свойствами селекторами для валидатора форм
const formConfig = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input-error',
}

  export { photoGallery, initialCards, clickEditButton, popupEditProfile, newUsername, newBio,
currentUsername, currentBio, closePopupEditProfile, formEditProfile, clickAddPhoto, popupAddPhoto,
newPhotoLocationTitle, newPhotoImageUrl, closePopupAddPhoto, formAddPhoto, inputErrorMessage, formConfig,
popupViewFullPhoto, popupViewFullPhotoImage, popupViewFullPhotoCaption, closePopupViewFullPhoto }
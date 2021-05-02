import 
    { photoGallery, initialCards, clickEditButton, formEditProfile, clickAddPhoto, formAddPhoto, formConfig, newBio, newUsername  } 
    from '../utils/constants.js'

import FormValidator from '../components/FormValidator.js'

import Card from '../components/Card.js'

import Section from '../components/Section.js'

import PopupWithImage from '../components/PopupWithImage.js'

import PopupWithForm from '../components/PopupWithForm.js'

import UserInfo from '../components/UserInfo.js'

import './index.css'

/*
import Popup from '../../scripts/components/Popup.js'*/

//Создаю попап с фото фулвью (экземпляр PopupWithImage), добавляю ему слушателей
const popupFullViewPhoto = new PopupWithImage ('.popup_use_view-full-photo')
popupFullViewPhoto.setEventListeners();

//Пишу функцию создания карточки 
const createCard = (data) => {
    const newPhoto = new Card (
        {
            data,
            handleCardClick: () => {
                popupFullViewPhoto.open(data)
            }
        },
         '#photo')
   return newPhoto.generateCard();
}

//Создаю грид фотокарточек (экземпляр Section)
const renderGallery = new Section ({
    items: initialCards,
    renderer: (data) => {
        const newPhotoAdded = createCard(data);
        renderGallery.addItem(newPhotoAdded, true);
    },
}, photoGallery)

//Рендерю фотокарточки на странице
renderGallery.renderItems();

//Создаю экземпляр класса валидации с формой добавления фотографии
const formAddPhotoValidated = new FormValidator(formConfig, formAddPhoto); 

//Запускаю валидацию формы добавления фотографии
formAddPhotoValidated.enableValidation();

//Создаю попапа добавления фото (экземпляр PopupWithForm) и добавляю ему слушателей
const popupAddPhotoForm = new PopupWithForm (
    '.popup_use_add-photo', 
    (values) => {
        const data = {link: values.link, name: values.name}
        const newPhotoAdded = createCard(data);
        renderGallery.addItem(newPhotoAdded, false);
        popupAddPhotoForm.close();
    }, 
    '.form__container'
    )

popupAddPhotoForm.setEventListeners();

//Добавляю слушателя на кнопку добавление фотографии 
clickAddPhoto.addEventListener ('click', () => {
    formAddPhotoValidated.disableSubmitButton();
    popupAddPhotoForm.open()
})

//Создаю экземпляра класса с объектом информации о пользователе 
const userinfo = new UserInfo('.profile__username', '.profile__bio');

//Создаю попап редактирования профиля (экземпляр класса PopupWithForm) и добавляю слушателей
const popupEditProfileInfo = new PopupWithForm (
    '.popup_use_edit-profile', 
    (values) => {
        const data = {username: values.username, bio: values.bio}
        userinfo.setUserInfo(data.username, data.bio)
        popupEditProfileInfo.close();
    }, 
    '.form__container'
)

popupEditProfileInfo.setEventListeners();

//Создаю экземпляр класса валидации с формой редактирования профиля 
const formEditProfileValidated = new FormValidator(formConfig, formEditProfile);

//Запускаю валидацию формы редактирования профиля 
formEditProfileValidated.enableValidation();

//Добавляю слушатель на кнопку редактирования профиля, передаю данные со страницы в форму, открываю попап 

clickEditButton.addEventListener('click', () => {
    
    const currentUserInfo = userinfo.getUserInfo();
    newUsername.value = currentUserInfo.username;
    newBio.value = currentUserInfo.bio;

    formEditProfileValidated.disableSubmitButton();
    popupEditProfileInfo.open()
})
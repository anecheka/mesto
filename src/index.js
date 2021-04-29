import 
    { photoGallery, initialCards, clickEditButton, formEditProfile, clickAddPhoto, formAddPhoto, formConfig, newBio, newUsername  } 
    from './scripts/utils/constants.js'

import FormValidator from './scripts/components/FormValidator.js'

import Card from './scripts/components/Card.js'

import Section from './scripts/components/Section.js'

import PopupWithImage from './scripts/components/PopupWithImage.js'

import PopupWithForm from './scripts/components/PopupWithForm.js'

import UserInfo from './scripts/components/UserInfo.js'

import './pages/index.css'

//Создаю попап с фото фулвью (экземпляр PopupWithImage), добавляю ему слушателей
const popupFullViewPhoto = new PopupWithImage ('.popup_use_view-full-photo')
popupFullViewPhoto.setEventListeners();

//Создаю грид фотокарточек (экземпляр Section)
const renderGallery = new Section ({
    items: initialCards,
    renderer: (data) => {
        const newPhoto = new Card (
            {
                data,
                handleCardClick: () => {
                    popupFullViewPhoto.open(data)
                }
            },
             '#photo')
        const newPhotoAdded = newPhoto.generateCard();
        renderGallery.addItem(newPhotoAdded, true);
    },
}, photoGallery)

//Рендерю фотокарточки на странице
renderGallery.renderItems();

//Создаю попапа добавления фото (экземпляр PopupWithForm) и добавляю ему слушателей
const popupAddPhotoForm = new PopupWithForm (
    '.popup_use_add-photo', 
    (values) => {
        const data = {link: values.link, name: values.name}
        const newPhoto = new Card (
            {
                data,
                handleCardClick: () => {
                    popupFullViewPhoto.open(data)
                }
            },
             '#photo')
        const newPhotoAdded = newPhoto.generateCard();
        renderGallery.addItem(newPhotoAdded, false);
        popupAddPhotoForm.close();
    }, 
    '.form__container'
    )

popupAddPhotoForm.setEventListeners();

//Добавляю слушателя на кнопку добавление фотографии 
clickAddPhoto.addEventListener ('click', () => {
    popupAddPhotoForm.open()
})


//Создаю экземпляра класса с объектом информации о пользователе 
const userinfo = new UserInfo();

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

//Добавляю слушатель на кнопку редактирования профиля, передаю данные со страницы в форму, открываю попап 

clickEditButton.addEventListener('click', () => {
    
    const currentUserInfo = userinfo.getUserInfo();
    newUsername.value = currentUserInfo.username;
    newBio.value = currentUserInfo.bio;

    formEditProfileValidated.enableValidation();
    popupEditProfileInfo.open()
})


//Создаю экземпляр класса валидации с формой редактирования профиля 
const formEditProfileValidated = new FormValidator(formConfig, formEditProfile);

//Запускаю валидацию формы редактирования профиля 
formEditProfileValidated.enableValidation();

//Создаю экземпляр класса валидации с формой добавления фотографии
const formAddPhotoValidated = new FormValidator(formConfig, formAddPhoto); 

//Запускаю валидацию формы добавления фотографии
formAddPhotoValidated.enableValidation();
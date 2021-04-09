import 
    { photoGallery, initialCards, clickEditButton, popupEditProfile, closePopupEditProfile, formEditProfile, clickAddPhoto, popupAddPhoto, newPhotoLocationTitle, newPhotoImageUrl, closePopupAddPhoto, formAddPhoto, formConfig  } 
    from './constants.js'

import { FormValidator } from './FormValidator.js'

import { Card } from './Card.js'

import 
    { clickCloseEditProfile, showPopupEditProfile, submitInfo, 
    showAddPhoto, clickCloseAddPhoto } 
    from './utils.js'

//Рендерим галерею из массива при загрузке страницы
initialCards.forEach ((item) => {
    const newPhoto = new Card (item, '#photo'); 
    const addedPhoto = newPhoto.generateCard(); 
    photoGallery.append(addedPhoto);
});

//Создаем экземпляр класса с формой редактирования профиля 
const formEditProfileValidated = new FormValidator(formConfig, formEditProfile);

//Запускаем валидацию формы редактирования профиля 
formEditProfileValidated.enableValidation();

//Создаем экземпляр класса с формой добавления фотографии
const formAddPhotoValidated = new FormValidator(formConfig, formAddPhoto); 

//Запускаем валидацию формы добавления фотографии
formAddPhotoValidated.enableValidation();

//Вызываем функцию открытия попапа при клике на иконку добавления фото
clickAddPhoto.addEventListener('click', showAddPhoto);

//Сохраняем данные, введенные в попапе, в форме карточки, и закрываем попап
formAddPhoto.addEventListener ('submit', function(evt) {

        evt.preventDefault();

        const newPhoto = new Card ({name: newPhotoLocationTitle.value, link: newPhotoImageUrl.value}, '#photo');

        const addedPhoto = newPhoto.generateCard(); 

        photoGallery.prepend(addedPhoto);

        newPhotoLocationTitle.value = '';
        newPhotoImageUrl.value = '';

        clickCloseAddPhoto();
});

//Вызываем функцию закрытия попапа добавления фото при клике на иконку крестика 
closePopupAddPhoto.addEventListener('click', clickCloseAddPhoto);

//Закрываем попап добавления фото по клику на оверлей 
popupAddPhoto.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
    clickCloseAddPhoto();
    };
  });

//Вызываем функцию открытия попапа при клике на иконку редактирования профиля
clickEditButton.addEventListener('click', showPopupEditProfile);

//Вызываем функцию закрытия попапа при клике на иконку крестика 
closePopupEditProfile.addEventListener('click', clickCloseEditProfile);

//Закрываем попап редактирования профиля по клику на оверлей 
popupEditProfile.addEventListener('click', function (evt) {
if (evt.target.classList.contains('popup_is-opened')) {
clickCloseEditProfile();
};
});

//Сохраняем данные, введенные в попапе, в профиль пользователя на странице, и закрываем попап
formEditProfile.addEventListener('submit', submitInfo);


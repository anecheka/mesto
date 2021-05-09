const clickEditButton = document.querySelector('#edit-profile'); //Переменная для кнопки редактирования профиля
const newUsername = document.querySelector('#username'); //Переменная для инпута с именем пользователя
const newBio = document.querySelector('#bio'); //Переменная для инпута с биографией
const formEditProfile = document.querySelector('.form.form_function_edit-profile'); //Переменная для формы редактирования профиля
const newPhotoName = document.querySelector('#location-name') //Переменная для инута с названием места карточки
const newPhotoURL = document.querySelector('#photo-url') //Переменная для инпута с урл картинки места
const clickAddPhoto = document.querySelector('#add-element'); //Переменная для кнопки добавления фото
const formAddPhoto = document.querySelector('.form.form_function_add-photo'); //Переменная для формы редактирования профиля
const photoGallery = document.querySelector('.elements'); //Переменная для фотопотока пользователя
const clickAvatarImage = document.querySelector('.profile__avatar') //Переменная для контейнера с аватаркой
const formChangeAvatar = document.querySelector('form.form_function_update-avatar-image')//Переменная для формы редактирования аватара
const newAvatarURL = document.querySelector('#avatar-image-url') //Переменная для инпута с урл аватарки

//Объект со свойствами селекторами для валидатора форм
const formConfig = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input-error',
}

  export { photoGallery, clickEditButton, newUsername, newBio,
formEditProfile, clickAddPhoto, formAddPhoto, formConfig, clickAvatarImage, formChangeAvatar,
newPhotoName, newPhotoURL, newAvatarURL }
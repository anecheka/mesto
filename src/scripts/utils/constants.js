const clickEditButton = document.querySelector('#edit-profile'); //Переменная для кнопки редактирования профиля
const newUsername = document.querySelector('#username'); //Переменная для инпута с именем пользователя
const newBio = document.querySelector('#bio'); //Переменная для инпута с биографией
const formEditProfile = document.querySelector('.form.form_function_edit-profile'); //Переменная для формы редактирования профиля
const clickAddPhoto = document.querySelector('#add-element'); //Переменная для кнопки добавления фото
const formAddPhoto = document.querySelector('.form.form_function_add-photo'); //Переменная для формы редактирования профиля
const photoGallery = document.querySelector('.elements'); //Переменная для фотопотока пользователя

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

  export { photoGallery, initialCards, clickEditButton, newUsername, newBio,
formEditProfile, clickAddPhoto, formAddPhoto, formConfig }
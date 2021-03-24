const clickEditButton = document.querySelector('#edit-profile'); //Переменная для кнопки редактирования профиля
const popupEditProfile = document.querySelector('.popup.popup_use_edit-profile'); //Переменная для попапа c редактированием профиля
const newUsername = document.querySelector('#username'); //Переменная для инпута с именем пользователя
const newBio = document.querySelector('#bio'); //Переменная для инпута с биографией
const currentUsername = document.querySelector('.profile__username'); //Переменная с именем пользователя в профиле на странице 
const currentBio = document.querySelector('.profile__bio'); //Переменная с био пользователя в профиле на странице
const closePopupEditProfile = document.querySelector('#close-popup-edit-profile'); //Переменная для кнопки-крестика в попапе редактирования профиля
const formEditProfile = document.querySelector('.form.form_function_edit-profile'); //Переменная для формы редактирования профиля

/*

+++++Функционал редактирования профиля
В попапе при открытии находятся данные со страницы. 
При их редактировани в попапе данные сохраняются на странице.

*/

//++Функция закрытия попапа - универсальная для всех попапов
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
}

//Функция закрытия попапа редактирования профиля
function clickCloseEditProfile() {
  closePopup(popupEditProfile);
};

//Функция сохранения информации из попапа в профиль пользователя (редактирование профиля)
function editProfile() {
    currentUsername.textContent = newUsername.value;
    currentBio.textContent = newBio.value;
};

//Функция открытия попапа - универсальная для всех попапов
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
}

//Функция открытия попапа редактирования профиля
function showPopupEditProfile() {
    openPopup(popupEditProfile);
    newUsername.value = currentUsername.textContent;
    newBio.value = currentBio.textContent;
};

//Функция передачи данных из попапа с формой на страницу 
function submitInfo(evt) {
    evt.preventDefault();
    editProfile();
    clickCloseEditProfile();
};

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





/*
+++++ Функционал добавления фото
Сделайте так, чтобы форма открывалась нажатием на кнопку «+» и закрывалась кликом на крестик:
Можно написать имя карточки и дать ссылку на картинку.
Сделайте так, чтобы при клике на «сохранить» новая карточка попадала в начало контейнера с ними. А диалоговое окно после добавления автоматически закрывалось.

*/

const clickAddPhoto = document.querySelector('#add-element'); //Переменная для кнопки добавления фото
const popupAddPhoto = document.querySelector('.popup.popup_use_add-photo'); //Переменная для попапа добавления карточки
const newPhotoLocationTitle = document.querySelector('#location-name'); //Переменная для названием места в форме добавления карточки
const newPhotoImageUrl = document.querySelector('#photo-url'); //Переменная для поля с ссылкой на фото в форме добавления карточки
const closePopupAddPhoto = document.querySelector('#close-popup-add-photo'); //Переменная для кнопки-крестика в попапе добавления фото
const formAddPhoto = document.querySelector('.form.form_function_add-photo'); //Переменная для формы редактирования профиля
const inputErrorMessage = formAddPhoto.querySelectorAll('.form__input-error-message'); //Переменная сообщения об ошибке в попапе (нужна для обнуления сообщения об ошибке при повторном открытии попапа)

//Функция открытия попапа добавления фото
function showAddPhoto() {
    openPopup(popupAddPhoto);
};

//Функция закрытия попапа добавления фото
function clickCloseAddPhoto() {
  closePopup(popupAddPhoto);
  refreshAddPhoto();
};

//Функция очистки контента в форме вместе с закрытием попапа 
function refreshAddPhoto () {
  newPhotoLocationTitle.value = '';
  newPhotoImageUrl.value = '';
  inputErrorMessage.forEach ((element) => {
    element.textContent = '';
  });
};


//Закрываем попап добавления фото по клику на оверлей 
popupAddPhoto.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
  clickCloseAddPhoto();
  };
});

//Создаем функцию создания дом ноды для фотокарточки
function createPhotoDOMNode(item) {

    //Создаем переменную для темплейта с фотокарточкой
    const photoTemplate = document.querySelector('#photo');

    //Создаем переменную для клонирования контента темплейта для создании фотокарточки
    const addedPhoto = photoTemplate.content.cloneNode(true);
    
    //Прописываем свойства объекта для функции
    const addedPhotoTitle = addedPhoto.querySelector('.element__title');
    addedPhotoTitle.textContent = item.name;

    const addedPhotoImage = addedPhoto.querySelector('.element__photo');
    addedPhotoImage.src = item.link; 
    addedPhotoImage.alt = item.name; 

    //Создаем переменную для кнопки лайка 
    const likeButton = addedPhoto.querySelector('.element__like-button'); 

    //Вызываем функцию лайка по клику
    likeButton.addEventListener('click', likeButtonClicked); 

    //Создаем переменную для удаления карточки
    const deleteButton = addedPhoto.querySelector('.element__delete-button');

    //Удаляем карточку по клику 
    deleteButton.addEventListener('click', deleteButtonClicked);

    addedPhotoImage.addEventListener('click', openFullPhoto);

    //Пишем функцию открытия попапа с фото фулл вью c данными фотографии
    function openFullPhoto() {
      openPopup(popupViewFullPhoto);
      popupViewFullPhotoImage.src = item.link;
      popupViewFullPhotoCaption.alt = item.name; 
      popupViewFullPhotoCaption.textContent = item.name;
    };

    return addedPhoto; 
};

//Функция передачи данных из попапа с фотокарточкой на страницу 
function submitAddedPhoto(evt) {
    evt.preventDefault();

    const item = {name: newPhotoLocationTitle.value, link: newPhotoImageUrl.value};

    const addPhoto = createPhotoDOMNode(item);

    photoGallery.prepend(addPhoto);

    newPhotoLocationTitle.value = '';
    newPhotoImageUrl.value = '';

    clickCloseAddPhoto();
};

//Пишем функцию клика по кнопке лайка
function likeButtonClicked (evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('element__like-button_active');
};

//Пишем функцию клика по кнопке Удалить 
function deleteButtonClicked (evt) {
  const eventTarget = evt.target;
  const currentPhoto = eventTarget.closest('.element'); 

  currentPhoto.remove ();
};

//Сохраняем данные, введенные в попапе, в форме карточки, и закрываем попап
formAddPhoto.addEventListener('submit', submitAddedPhoto);

//Вызываем функцию открытия попапа при клике на иконку добавления фото
clickAddPhoto.addEventListener('click', showAddPhoto);

//Вызываем функцию закрытия попапа добавления фото при клике на иконку крестика 
closePopupAddPhoto.addEventListener('click', clickCloseAddPhoto);


/* 
+++++Функционал фул вью 
*/

//Константа попапа фулвью фото
const popupViewFullPhoto = document.querySelector('.popup.popup_use_view-full-photo');

//Константа фотографии фулвью фото
const popupViewFullPhotoImage = popupViewFullPhoto.querySelector('.popup__full-photo');

//Константа заголовка к фотографии фулвью фото 
const popupViewFullPhotoCaption = popupViewFullPhoto.querySelector('.popup__full-photo-title');

 //Переменная крестика попапа фул вью
 const closePopupViewFullPhoto = document.querySelector('#close-popup-view-full-photo');

 //Пишем функцию закрытия попап с фото фул вью 
 function clickCloseFullPhoto() {
   closePopup(popupViewFullPhoto);
 };

//Закрываем попап фулл вью по клику на крестик 
closePopupViewFullPhoto.addEventListener('click', clickCloseFullPhoto);

//Закрываем попап фул вью по клику на оверлей 
popupViewFullPhoto.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    clickCloseFullPhoto();
  };
});

/* 
+++++Шесть карточек «из коробки»
*/

const photoGallery = document.querySelector('.elements'); //Переменная для фотопотока пользователя

//Задаем массив фотографий для страницы 
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

//Пишем функцию с циклом, которая берет данные из массива initialCards и добавляем в галерею
function renderGallery() {
    const result = initialCards.map(createPhotoDOMNode);

    photoGallery.append(...result);
}

renderGallery();



//Функционал закрытия попапа по клику на Esc 

const closePopupEsc = (evt, popup) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    popup.classList.remove('popup_is-opened');
  };
};
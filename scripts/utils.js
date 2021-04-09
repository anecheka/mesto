import { popupAddPhoto, newPhotoImageUrl, newPhotoLocationTitle, 
       inputErrorMessage, popupEditProfile, newUsername, currentUsername, 
       newBio, currentBio, popupViewFullPhotoCaption, popupViewFullPhotoImage,
       popupViewFullPhoto, closePopupViewFullPhoto } from './constants.js'

//Функция закрытия попапа - универсальная для всех попапов
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

/* Функционал с добавлением фото */

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


/* 
+++++Функционал фул вью 
*/

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

//Функционал закрытия попапа по клику на Esc 

const closePopupEsc = (evt, popup) => {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_is-opened');
      popup.classList.remove('popup_is-opened');
    };
  };

  

export 
    { closePopup, clickCloseEditProfile, editProfile, showPopupEditProfile, submitInfo, 
    popupViewFullPhoto, popupViewFullPhotoImage, popupViewFullPhotoCaption, 
    closePopupViewFullPhoto, clickCloseFullPhoto, openPopup, closePopupEsc, 
    showAddPhoto, clickCloseAddPhoto, refreshAddPhoto  }

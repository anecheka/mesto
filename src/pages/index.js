import 
    { photoGallery, clickEditButton, formEditProfile, clickAddPhoto, formAddPhoto, formConfig, newBio, newUsername, clickAvatarImage, formChangeAvatar, newPhotoName, newPhotoURL, newAvatarURL  } 
    from '../utils/constants.js'

import FormValidator from '../components/FormValidator.js'

import Card from '../components/Card.js'

import Section from '../components/Section.js'

import PopupWithImage from '../components/PopupWithImage.js'

import PopupWithForm from '../components/PopupWithForm.js'

import UserInfo from '../components/UserInfo.js'

import Api from '../components/Api.js'

import './index.css'

import PopupWithConfirmation from '../components/PopupWithConfirmation.js'

//Создаю экземляр класса Api 
const api = new Api ({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
    headers: {
        authorization: 'a260d49c-522b-4bbd-9cd1-72740d17aa2a', 
        'Content-type': 'application/json',
    }
})

let userID

api.getDataForPageRender()
    .then((args)=> {
        const [ initialCardsData, userData ] = args;
        userinfo.setUserInfo(userData);
        userID = userData._id;
        renderGallery.renderItems(initialCardsData)
    })
    .catch((err) => {
        console.log(err);
    })

//Создаю попап с фото фулвью (экземпляр PopupWithImage), добавляю ему слушателей
const popupFullViewPhoto = new PopupWithImage (
'.popup_use_view-full-photo')
popupFullViewPhoto.setEventListeners();

//Пишу функцию создания карточки 
const createCard = (item) => {
    const newPhoto = new Card (
            item,

            () => {
                popupFullViewPhoto.open(item)
            },

            () => {
                api.likeCard(item.id)
                    .then((item) => newPhoto.setLikesInfo(item.likes))
                    .catch((err) => {
                        console.log(err);
                    })
            },

            () => {
                api.dislikeCard(item.id)
                .then((item) => newPhoto.setLikesInfo(item.likes))
                .catch((err) => {
                    console.log(err);
                })
            },
           
            () => {
                popupConfirmCardRemoval.setActionForConfirmation(
                    () => {
                        api.deleteCard(item.id)
                        .then(() => newPhoto.deleteButtonClicked())
                        .then (()=> popupConfirmCardRemoval.close())
                        .catch(err => console.error(err))
                    }
                )
                popupConfirmCardRemoval.open();
            }
        ,
         '#photo', 
          userID)

   return newPhoto.generateCard();
}

//Создаю грид фотокарточек (экземпляр Section)
const renderGallery = new Section (
    (item) => {
        const newPhotoAdded = createCard({
            name: item.name,
            link: item.link,
            id: item._id,
            likes: item.likes,
            owner: item.owner,
        });
        renderGallery.addItem(newPhotoAdded, true)},
    photoGallery)

//Создаю экземпляр класса валидации с формой добавления фотографии
const formAddPhotoValidated = new FormValidator(formConfig, formAddPhoto); 

//Запускаю валидацию формы добавления фотографии
formAddPhotoValidated.enableValidation();

//Создаю попап добавления фото (экземпляр PopupWithForm) и добавляю ему слушателей
const popupAddPhotoForm = new PopupWithForm (
    '.popup_use_add-photo', 
    () => {
        dataSubmitting (formAddPhoto, true)
        api.addNewCard(newPhotoName.value, newPhotoURL.value)
        .then((item) => {
            const newPhotoAdded = createCard({
                name: item.name,
                link: item.link,
                id: item._id,
                likes: item.likes,
                owner: item.owner,
            });
            renderGallery.addItem(newPhotoAdded, false)})
        .then (() => popupAddPhotoForm.close())
        .catch((err) => {
            console.log(err);
        })
        .finally (() => 
            dataSubmitting (formAddPhoto, false, 'Создать'))
    },
    '.form__container'
    )

popupAddPhotoForm.setEventListeners();

//Добавляю слушатель на кнопку добавление фотографии 
clickAddPhoto.addEventListener ('click', () => {
    formAddPhotoValidated.disableSubmitButton();
    popupAddPhotoForm.open()
})

//Создаю экземпляр класса с объектом информации о пользователе 
const userinfo = new UserInfo(
    '.profile__username', 
    '.profile__bio', 
    '.profile__avatar-image'
);

//Создаю попап редактирования профиля (экземпляр класса PopupWithForm) и добавляю слушателей, данные берутся и отправляются на сервер
const popupEditProfileInfo = new PopupWithForm (
    '.popup_use_edit-profile', 
    () => {
        dataSubmitting (formEditProfile, true)
        api.updateUserData(newUsername.value, newBio.value)
        .then ((userData) => {
            userinfo.setUserInfo(userData)
        })
        .then (() => popupEditProfileInfo.close())
        .catch((err) => {
            console.log(err);
        })
        .finally (() => 
            dataSubmitting (formEditProfile, false, 'Сохранить'))
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

//Создаю экземпляр класса PopupWithForm для попапа редактирования аватара
const popupChangeAvatarImage = new PopupWithForm (
    '.popup_use_update-avatar-image', 
    () => {
        dataSubmitting (formChangeAvatar, true)
        api.updateAvatarPhoto(newAvatarURL.value)
        .then ((userData) => {
            userinfo.setUserInfo(userData)
        })
        .then (() => popupChangeAvatarImage.close())
        .catch((err) => {
            console.log(err);
        })
        .finally (()=> dataSubmitting (formChangeAvatar, false, 'Сохранить'))
        }, 
    '.form__container'
    )

popupChangeAvatarImage.setEventListeners();

//Создаю экземпляр класса FormValidator для формы редактирования аватара 
const formChangeAvatarValidated = new FormValidator(formConfig, formChangeAvatar); 

//Открываю форму редактирования аватара по клику на аватар 
clickAvatarImage.addEventListener('click', () => {
    formChangeAvatarValidated.disableSubmitButton ();
    popupChangeAvatarImage.open();
})

//Запускаю валидацию формы редактирования аватара
formChangeAvatarValidated.enableValidation();

//Создаю экземпляр класса PopupWithConfirmation для окошка подтверждения удаления фотокарточки 
const popupConfirmCardRemoval = new PopupWithConfirmation(
    '.popup_use_confirm-remove-photo', 
    () => {}
)

popupConfirmCardRemoval.setEventListeners();

//Функция лоудера для загрузки данных на сервер в форме сабмита 
function dataSubmitting (form, isLoading, copy) {
    const submitButton = form.querySelector('.form__submit-button')
    if (isLoading) {
        submitButton.textContent = 'Cохранение...';
        submitButton.setAttribute('disabled', true);
    } else if (!isLoading) {
        submitButton.textContent = copy; 
        submitButton.removeAttribute('disabled');
    }
}
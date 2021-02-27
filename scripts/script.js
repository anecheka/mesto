let clickEditButton = document.querySelector('#edit-profile'); //Переменная для кнопки редактирования профиля
let popup = document.querySelector('.popup'); //Переменная для попапа 
let newUsername = document.querySelector('#username'); //Переменная для инпута с именем пользователя
let newBio = document.querySelector('#bio'); //Переменная для инпута с биографией
let currentUsername = document.querySelector('.profile__username'); //Переменная с именем пользователя в профиле на странице 
let currentBio = document.querySelector('.profile__bio'); //Переменная с био пользователя в профиле на странице
let closePopup = document.querySelector('#close-popup'); //Переменная для кнопки-крестика
let form = document.querySelector('.form'); //Переменная для формы

//Функция закрытия попапа
function clickClose() {
    popup.classList.remove('popup_is-opened');
};

//Функция сохранения информации из попапа в профиль пользователя (редактирование профиля)
function editProfile() {
    currentUsername.textContent = newUsername.value;
    currentBio.textContent = newBio.value;
};

//Функция открытия попапа
function showPopup() {
    popup.classList.add('popup_is-opened');
    newUsername.value = currentUsername.textContent;
    newBio.value = currentBio.textContent;
};

//Функция передачи данных из попапа с формой на страницу 
function submitInfo(evt) {
    evt.preventDefault();
    editProfile();
    clickClose();
};

//Вызываем функцию открытия попапа при клике на иконку редактирования профиля
clickEditButton.addEventListener('click', showPopup);

//Вызываем функцию закрытия попапа при клике на иконку крестика 
closePopup.addEventListener('click', clickClose);

//Сохраняем данные, введенные в попапе, в профиль пользователя на странице, и закрываем попап
form.addEventListener('submit', submitInfo);




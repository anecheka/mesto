let clickEditButton = document.querySelector('#edit-profile'); 
let popup = document.querySelector('.popup'); 
let newUsername = document.querySelector('#username'); 
let newBio = document.querySelector('#bio'); 
let currentUsername = document.querySelector('.profile__username');
let currentBio = document.querySelector('.profile__bio');
let closePopup = document.querySelector('#close-popup'); 
let form = document.querySelector('.form');
let submitInfo = document.querySelector('#submit-profile-info')

function clickClose () {
    popup.classList.remove('popup_is-opened');
};

function editProfile() {
    currentUsername.textContent = newUsername.value;
    currentBio.textContent = newBio.value;
};

function showPopup () {
    popup.classList.add('popup_is-opened');
    newUsername.value = currentUsername.textContent;
    newBio.value = currentBio.textContent;
};

submitInfo.addEventListener ('keyup', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submitInfo.click();
    }
});

clickEditButton.addEventListener ('click', showPopup);

closePopup.addEventListener ('click', clickClose);

form.addEventListener ('submit', evt => {
    evt.preventDefault();
    editProfile();
    clickClose();
    console.log('triggered');
});





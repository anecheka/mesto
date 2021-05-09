export default  class UserInfo {
    constructor(userNameSelector, bioSelector, avatarSelector) {
        this._username = document.querySelector(userNameSelector);
        this._bio = document.querySelector(bioSelector);
        this._avatar = document.querySelector(avatarSelector);
    }
    
    //Публичный метод, который возвращает объект с данными пользователя, для попапа редактирования профиля при открытии 
    getUserInfo () {
        this._userInfo = {};
        this._userInfo.username = this._username.textContent;
        this._userInfo.bio = this._bio.textContent;
        return this._userInfo;
    }
    //Публичный метод, который принимает новые данные пользователя и отправляет на страницу
    setUserInfo (data) {
        this._username.textContent = data.name;
        this._bio.textContent = data.about;
        this._avatar.src = data.avatar;
    }

}
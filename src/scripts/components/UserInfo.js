export default  class UserInfo {
    constructor() {
        this._username = document.querySelector('.profile__username');
        this._bio = document.querySelector('.profile__bio')
    }
    
    //Публичный метод, который возвращает объект с данными пользователя, для попапа редактирования профиля при открытии 
    getUserInfo () {
        this._userInfo = {};
        this._userInfo.username = this._username.textContent;
        this._userInfo.bio = this._bio.textContent;
        return this._userInfo;
    }
    //Публичный метод, который принимает новые данные пользователя и отправляет на страницу
    setUserInfo (username, bio) {
        this._username.textContent = username;
        this._bio.textContent = bio
    }

}
export default class Api {
    constructor(options) {
      this._url = options.url,
      this._headers = options.headers
    }
  
    getInitialCards() {
        return fetch(`${this._url}cards`, {
          headers: this._headers,
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
      
            return Promise.reject(`Ошибка: ${res.status}`);
          });
      }
  
    addNewCard(newPhotoName, newPhotoURL) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({name: newPhotoName, link: newPhotoURL}),
          })
            .then(res => {
              if (res.ok) {
                return res.json();
              }
        
              return Promise.reject(`Ошибка: ${res.status}`);
            });
        }

    deleteCard(id) {
        return fetch (`${this._url}cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
            })
            .then(res => {
                if (res.ok) {
                return res.json();
                }
        
                return Promise.reject(`Ошибка: ${res.status}`);
            });
        }  
        
    likeCard(id) {
        return fetch (`${this._url}cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers,
            })
            .then(res => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
        }

    dislikeCard(id) {
        return fetch (`${this._url}cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers,
            })
            .then(res => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
        }
    
    updateAvatarPhoto (avatarURL) {
        return fetch (`${this._url}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({avatar: avatarURL})
            })
            .then(res => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
        }

    getUserData (data) {
        return fetch (`${this._url}users/me/`, {
            method: "GET",
            headers: this._headers,
            })
            .then(data => {
                if (data.ok) {
                this._name = data.name,
                this._about = data.about,
                this._avatar = data.avatar
                return data.json();
            }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
        }

    updateUserData (newUsername, newBio) {
        return fetch (`${this._url}users/me/`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({name: newUsername, about: newBio})
            })
            .then(res => {
                if (res.ok) {
                return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
        }

    getDataForPageRender() {
        return Promise.all([this.getInitialCards(), this.getUserData()])
    }

    getCardInfo (id) {
        return fetch (`${this._url}cards/likes/${id}`, {
            method: "GET",
            headers: this._headers,
            })
            .then(data => {
                if (data.ok) {
                return data.json();
            }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
        }
    }

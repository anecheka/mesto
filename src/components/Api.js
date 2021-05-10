export default class Api {
    constructor(options) {
      this._url = options.url,
      this._headers = options.headers
    }
  
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
      }
    
    getInitialCards() {
        return fetch(`${this._url}cards`, {
          headers: this._headers,
        })
          .then (res => this._getResponseData(res)
          
        );
      }
  
    addNewCard(newPhotoName, newPhotoURL) {
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({name: newPhotoName, link: newPhotoURL}),
          })
          .then (res => this._getResponseData(res)
          
        );
      }

    deleteCard(id) {
        return fetch (`${this._url}cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
            })
          .then (res => this._getResponseData(res)
          
        );
        }  
        
    likeCard(id) {
        return fetch (`${this._url}cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers,
            })
        .then (res => this._getResponseData(res)
          
            );
        }

    dislikeCard(id) {
        return fetch (`${this._url}cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers,
            })
        .then (res => this._getResponseData(res)
          
            );
        }
    
    updateAvatarPhoto (avatarURL) {
        return fetch (`${this._url}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({avatar: avatarURL})
            })
        .then (res => this._getResponseData(res)
          
        );

        }

    getUserData (data) {
        return fetch (`${this._url}users/me/`, {
            method: "GET",
            headers: this._headers,
            })
        .then (res => this._getResponseData(res)
          
            );
        }

    updateUserData (newUsername, newBio) {
        return fetch (`${this._url}users/me/`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({name: newUsername, about: newBio})
            })
        .then (res => this._getResponseData(res)
          
            );
        }

    getDataForPageRender() {
        return Promise.all([this.getInitialCards(), this.getUserData()])
    }

    getCardInfo (id) {
        return fetch (`${this._url}cards/likes/${id}`, {
            method: "GET",
            headers: this._headers,
            })
        .then (res => this._getResponseData(res)
          
           );
        }
    }

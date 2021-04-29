export default class FormValidator {

    //В конструктор добавляю объект настроек с селектораи и классами формы и форма, которая валидируется
    constructor (formSettings, form) {
    this._inputSelector = formSettings.inputSelector;
    this._submitButtonSelector = formSettings.submitButtonSelector;
    this._inactiveButtonClass = formSettings.inactiveButtonClass;
    this._inputErrorClass = formSettings.inputErrorClass;
    this._form = form;
    }

    //Метод определения невалидного инпута 
    _hasInvalidInput = () => {
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    };

    //Метод переключения состояния кнопки 
    _toggleButtonState = () => {
        if (this._hasInvalidInput === true) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            console.log();
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    };

    //Метод добавления стиля / сообщeний ошибки
    _showInputError = (inputElement) => {
        const errorElement = document.querySelector(`.${inputElement.id}-error`); 
        inputElement.classList.add(this._inactiveButtonClass);
        errorElement.textContent = inputElement.validationMessage;
    };

    //Метод сброса стилей / сообщений ошибки
    _hideInputError = (inputElement) => {
        const errorElement = document.querySelector(`.${inputElement.id}-error`); 
        inputElement.classList.remove(this._inactiveButtonClass);
        errorElement.textContent= '';
    };

    //Метод проверки валидности заполнения поля 
    _checkValidity = (inputElement) => {
        if (inputElement.validity.valid) {
            //Убираю стили ошибки и сообщения об ошибках
            this._hideInputError(inputElement);

        } else {
            //Добавляю стиль ошибки полю и вывожу ошибку 
        this._showInputError(inputElement); 
        }
    };

    //Метод для слушателей событий 
    _setEventListeners = () => {
        //Ищу все поля инпутов
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));

        //Ишу кнопку сабмита конкретной формы 
        this._buttonElement = document.querySelector(this._submitButtonSelector);

        //Вызываю сразу проверку валидности форм и делаю кнопку неактивной
        this._toggleButtonState();

        //Навешиваю события на найденные поля 
        this._inputList.forEach(
            inputElement => {
                inputElement.addEventListener('input', () => {
                    //Проверяю валидность заполнения поля 
                    this._checkValidity(inputElement);

                    //Изменяю состояние кнопки сабмита, если поле невалидно 
                    this._toggleButtonState();
            });

        });
    };

    //Метод валидации
    enableValidation = () => {
                
                //Запрещаю отправку данных  на сервер при сабмите 
                this._form.addEventListener('submit', (evt) => {
                    evt.preventDefault ();
                });

                //Навешиваю слушателей
                this._setEventListeners();
            };
    }
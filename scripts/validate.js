//Функция определения невалидного инпута 
const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid); 
};

//Функция переключения состояния кнопки 
const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass} ) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};


//Функция добавления стиля / сообещний ошибки
const showInputError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
};

//Функция сброса стилей / сообщений ошибки
const hideInputError = (formElement, inputElement, inputErrorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent= '';
};

//Функция проверки валидности заполнения поля 
const checkValidity = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        //Убираю стили ошибки и сообщения об ошибках
        hideInputError(formElement, inputElement);

    } else {
        //Добавляю стиль ошибки полю и вывожу ошибку 
       showInputError(formElement, inputElement); 
    }
};

//Функция навешивания слушателей событий 
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
    //Ищу все поля инпутов
    const inputList = Array.from(formElement.querySelectorAll(inputSelector)); 

    //Ишу кнопку сабмита конкретной формы 
    const buttonElement = formElement.querySelector(submitButtonSelector); 

    //Вызываю сразу проверку валидности форм и делаю кнопку неактивной
    toggleButtonState(inputList, buttonElement, rest);

    //Навешиваю события на найденные поля 
    inputList.forEach(
        inputElement => {
            inputElement.addEventListener('input', () => {
                //Проверяю валидность заполнения поля 
                checkValidity(formElement, inputElement, rest);

                //Изменяю состояние кнопки сабмита, если поле невалидно 
                toggleButtonState(inputList, buttonElement, rest);
        });
    });
};

//Функция валидации
const enableValidation = ( { formSelector, ... rest}) => {

    //Создаю массив из всех элементов с классом .form
    const formList = Array.from(document.querySelectorAll(formSelector)); 

    //Прохожусь по всем элементам формы 
    formList.forEach((formElement) => {
            
            //Запрещаю отправку данных  на сервер при сабмите 
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault ();
            });

            //Навешиваю слушателей
            setEventListeners(formElement, rest);
        });
    };

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit-button_inactive',
    inputErrorClass: 'form__input-error',
  });


const inputErrorClass = 'input-error';
const errorElementActiveClass = 'error-active';

function showInputError(formElement, inputElement, errorMessage) {
    console.log('showInputError', formElement, inputElement, errorMessage);
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorElementActiveClass);
}

function hideInputError(formElement, inputElement) {
    console.log('hideInputError', formElement, inputElement);
}

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage
        );
    } else {
        hideInputError(formElement, inputElement);
    }
}

function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
}) {
    const formElements = document.querySelectorAll(formSelector);
    Array.from(formElements).forEach((formElement) => {
        // TODO: preventDefault назначены в другом месте;
        // разобраться, где оставить
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const inputElements = document.querySelectorAll(inputSelector);
        Array.from(inputElements).forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                checkInputValidity(formElement, inputElement);
            });
        });
    });
}

export { enableValidation };

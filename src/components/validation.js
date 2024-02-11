function isValid(inputElement) {
    return inputElement.validity.valid;
}

function errorSelector(id) {
    return `.${id}-error`;
}

function setSubmitAvailability(
    formElement,
    { inputSelector, submitButtonSelector, inactiveButtonClass }
) {
    const inputElementsArr = Array.from(
        formElement.querySelectorAll(inputSelector)
    );
    const targetElement = formElement.querySelector(submitButtonSelector);
    targetElement.classList.toggle(
        inactiveButtonClass,
        !inputElementsArr.every(isValid)
    );
}

function hideInputError({
    formElement,
    inputElement,
    inputErrorClass,
    errorClass,
}) {
    const errorElement = formElement.querySelector(
        errorSelector(inputElement.id)
    );
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
}

export function showInputError({
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass,
}) {
    const errorElement = formElement.querySelector(
        errorSelector(inputElement.id)
    );
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

export function clearValidation(
    formElement,
    {
        inputSelector,
        inputErrorClass,
        errorClass,
        inactiveButtonClass,
        submitButtonSelector,
    }
) {
    const inputElementsArr = Array.from(
        formElement.querySelectorAll(inputSelector)
    );
    inputElementsArr.forEach((inputElement) => {
        hideInputError({
            formElement,
            inputElement,
            inputErrorClass,
            errorClass,
        });
    });
    setSubmitAvailability(formElement, {
        inactiveButtonClass,
        inputSelector,
        submitButtonSelector,
    });
}

export function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
}) {
    const formElementsArr = Array.from(document.querySelectorAll(formSelector));

    formElementsArr.forEach((formElement) => {
        const inputElementsArr = Array.from(
            formElement.querySelectorAll(inputSelector)
        );

        inputElementsArr.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                inputElement.setCustomValidity(
                    inputElement.validity.patternMismatch
                        ? inputElement.dataset.errorMessage
                        : ''
                );
                if (isValid(inputElement)) {
                    hideInputError({
                        formElement,
                        inputElement,
                        inputErrorClass,
                        errorClass,
                    });
                } else {
                    showInputError({
                        formElement,
                        inputElement,
                        errorMessage: inputElement.validationMessage,
                        inputErrorClass,
                        errorClass,
                    });
                }
                setSubmitAvailability(formElement, {
                    inactiveButtonClass,
                    inputSelector,
                    submitButtonSelector,
                });
            });
            setSubmitAvailability(formElement, {
                inactiveButtonClass,
                inputSelector,
                submitButtonSelector,
            });
        });
    });
}

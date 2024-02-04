function isValid(inputElement) {
    return inputElement.validity.valid;
}

function showInputError({
    formElement,
    inputElement,
    errorMessage,
    inputErrorClass,
    errorClass,
}) {
    const errorSelector = `.${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorSelector);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
}

function hideInputError({
    formElement,
    inputElement,
    inputErrorClass,
    errorClass,
}) {
    const errorSelector = `.${inputElement.id}-error`;
    const errorElement = formElement.querySelector(errorSelector);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
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

function clearValidation(
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

function enableValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
}) {
    const formElementsArr = Array.from(document.querySelectorAll(formSelector));

    formElementsArr.forEach((formElement) => {
        // TODO: preventDefault назначены в другом месте;
        // разобраться, где оставить
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        const inputElementsArr = Array.from(
            formElement.querySelectorAll(inputSelector)
        );

        inputElementsArr.forEach((inputElement) => {
            inputElement.addEventListener('input', (evt) => {
                inputElement.setCustomValidity(
                    inputElement.validity.patternMismatch
                        ? inputElement.dataset.errorMessage
                        : ''
                );
                if (isValid(evt.target)) {
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
        });
    });
}

export { enableValidation, clearValidation };

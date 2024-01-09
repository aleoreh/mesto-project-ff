const isOpenedClassName = 'popup_is-opened';

export function openModal(element) {
    const firstInputElement = element.querySelector('input');
    const closeButtonElement = element.querySelector('.popup__close');
    closeButtonElement.setAttribute('aria-label', 'Закрыть форму');
    element.classList.add(isOpenedClassName);
    element.tabIndex = element.tabIndex === -1 ? 0 : element.tabIndex;
    (firstInputElement || closeButtonElement || element).focus();
    element.addEventListener('keydown', modalKeydownHandler);
}

export function closeModal(element) {
    element.classList.remove(isOpenedClassName);
    element.removeEventListener('keydown', modalKeydownHandler);
}

export function modalKeydownHandler(evt) {
    switch (evt.key) {
        case 'Escape':
            closeModal(this);
            break;
        default:
            break;
    }
}

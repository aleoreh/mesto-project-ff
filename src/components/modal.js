const isOpenedClassName = 'popup_is-opened';

export function openModal(element) {
    const firstInputElement = element.querySelector('input');
    const closeButtonElement = element.querySelector('.popup__close');

    closeButtonElement.setAttribute('aria-label', 'Закрыть форму');
    element.classList.add(isOpenedClassName);
    element.tabIndex = element.tabIndex === -1 ? 0 : element.tabIndex;
    (firstInputElement || closeButtonElement || element).focus();

    element.addEventListener('keydown', keydownHandler);
    element.addEventListener('click', clickHandler);
}

export function closeModal(element) {
    element.classList.remove(isOpenedClassName);

    element.removeEventListener('keydown', keydownHandler);
    element.addEventListener('click', clickHandler);
}

function keydownHandler(evt) {
    switch (evt.key) {
        case 'Escape':
            closeModal(this);
            break;
        default:
            break;
    }
}

function clickHandler(evt) {
    const contentElement = this.querySelector('.popup__content');
    const closeButtonElement = this.querySelector('.popup__close');
    if (evt.target === contentElement) {
        evt.stopPropagation();
    } else if (evt.target === this || evt.target === closeButtonElement) {
        closeModal(this);
    }
}

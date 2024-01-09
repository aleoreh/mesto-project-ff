const isOpenedClassName = 'popup_is-opened';
const popupCloseClassName = 'popup__close';
const popupContentClassName = 'popup__content';

export function openModal(element) {
    const firstInputElement = element.querySelector('input');
    const closeButtonElement = element.querySelector(`.${popupCloseClassName}`);

    element.classList.add(isOpenedClassName);
    element.tabIndex = element.tabIndex === -1 ? 0 : element.tabIndex;
    (firstInputElement || closeButtonElement || element).focus();
    closeButtonElement.setAttribute('aria-label', 'Закрыть форму');

    element.addEventListener('keydown', keydownHandler);
    element.addEventListener('click', clickHandler);
}

export function closeModal(element) {
    element.classList.remove(isOpenedClassName);

    element.removeEventListener('keydown', keydownHandler);
    element.removeEventListener('click', clickHandler);
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
    if (evt.target.classList.contains(popupContentClassName)) {
        evt.stopPropagation();
    } else if (
        evt.target === this ||
        evt.target.classList.contains(popupCloseClassName)
    ) {
        closeModal(this);
    }
}


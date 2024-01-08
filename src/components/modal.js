const isOpenedClassName = 'popup_is-opened';

export function openModal(rootElement) {
    const firstInputElement = rootElement.querySelector('input');
    const closeButtonElement = rootElement.querySelector('.popup__close');
    closeButtonElement.setAttribute('aria-label', 'Закрыть форму');
    rootElement.classList.add(isOpenedClassName);
    rootElement.tabIndex =
        rootElement.tabIndex === -1 ? 0 : rootElement.tabIndex;
    (firstInputElement || closeButtonElement || rootElement).focus();
}

export function closeModal(rootElement) {
    rootElement.classList.remove(isOpenedClassName);
}

export function handlePopupKeydown(evt, element, cb) {
    switch (evt.key) {
        case 'Escape':
            closeModal(element);
            cb();
            break;
        default:
            break;
    }
}

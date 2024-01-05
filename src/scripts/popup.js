function show(rootElement) {
    const contentElement = rootElement.querySelector('.popup__content');
    contentElement.addEventListener('click', (evt) => {
        evt.stopPropagation();
    });
    rootElement.classList.add('popup_is-opened');
    rootElement.addEventListener('click', () => {
        rootElement.classList.remove('popup_is-opened');
    });
    const closeButtonElement = rootElement.querySelector('.popup__close');
    closeButtonElement.addEventListener('click', () => {
        rootElement.classList.remove('popup_is-opened');
    });
}

export default { show };

function show(rootElement) {
    const isOpenedClassName = 'popup_is-opened';

    const contentElement = rootElement.querySelector('.popup__content');
    const closeButtonElement = rootElement.querySelector('.popup__close');
    const firstInputElement = rootElement.querySelector('input');

    function keydownHandler(evt) {
        switch (evt.key) {
            case 'Escape':
                hideRootElement();
                break;
            default:
                break;
        }
    }

    function contentClickHandler(evt) {
        // do not propagate click to the parent, as it closes when clicked
        evt.stopPropogation();
    }

    function hideRootElement() {
        rootElement.classList.remove(isOpenedClassName);

        rootElement.removeEventListener('keydown', keydownHandler);
        rootElement.removeEventListener('click', hideRootElement);
        contentElement.removeEventListener('click', contentClickHandler);
        closeButtonElement.removeEventListener('click', hideRootElement);
    }

    function showRootElement() {
        rootElement.classList.add(isOpenedClassName);

        rootElement.addEventListener('keydown', keydownHandler);
        rootElement.addEventListener('click', hideRootElement);
        contentElement.addEventListener('click', contentClickHandler);
        closeButtonElement.addEventListener('click', hideRootElement);
    }

    function setFocus() {
        (firstInputElement || closeButtonElement || rootElement).focus();
    }

    showRootElement();
    setFocus();
}

export default { show };

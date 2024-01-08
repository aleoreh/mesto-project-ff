function show(rootElement, { src, alt, caption }) {
    const isOpenedClassName = 'popup_is-opened';

    const initTabIndex = rootElement.tabIndex;

    const contentElement = rootElement.querySelector('.popup__content');
    const closeButtonElement = rootElement.querySelector('.popup__close');
    const imageElement = rootElement.querySelector('.popup__image');
    const captionElement = rootElement.querySelector('.popup__caption');

    function setValues() {
        imageElement.src = src;
        imageElement.alt = alt;
        captionElement.textContent = caption;
        closeButtonElement.setAttribute(
            'aria-label',
            `Закрыть просмотр: ${caption}`
        );
    }

    function handleKeydown(evt) {
        switch (evt.key) {
            case 'Escape':
                hideRootElement();
                break;
            default:
                break;
        }
    }

    function handleClickOnContent(evt) {
        // do not propagate click to the parent, as it closes when clicked
        evt.stopPropagation();
    }

    function hideRootElement() {
        rootElement.classList.remove(isOpenedClassName);
        rootElement.tabIndex = initTabIndex;

        rootElement.removeEventListener('keydown', handleKeydown);
        rootElement.removeEventListener('click', hideRootElement);
        contentElement.removeEventListener('click', handleClickOnContent);
        closeButtonElement.removeEventListener('click', hideRootElement);
    }

    function showRootElement() {
        rootElement.classList.add(isOpenedClassName);
        rootElement.tabIndex =
            rootElement.tabIndex === -1 ? 0 : rootElement.tabIndex;

        rootElement.addEventListener('keydown', handleKeydown);
        rootElement.addEventListener('click', hideRootElement);
        contentElement.addEventListener('click', handleClickOnContent);
        closeButtonElement.addEventListener('click', hideRootElement);

        setValues();
    }

    function setFocus() {
        rootElement.focus();
    }

    showRootElement();
    setFocus();
}

export default { show };

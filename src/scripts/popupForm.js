function show(rootElement, form, formData, onSubmit) {
    const isOpenedClassName = 'popup_is-opened';

    const initTabIndex = rootElement.tabIndex;

    const contentElement = rootElement.querySelector('.popup__content');
    const closeButtonElement = rootElement.querySelector('.popup__close');
    const firstInputElement = rootElement.querySelector('input');

    function setFormData() {
        Object.keys(formData).forEach((key) => {
            form[key].value = formData[key];
        });
    }

    function clearFormData() {
        Object.keys(formData).forEach((key) => {
            form[key].value = '';
        });
    }

    function getFormData() {
        return Object.keys(formData).reduce((acc, key) => {
            return { ...acc, [key]: form[key].value };
        }, {});
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

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit(getFormData());
        hideRootElement();
    }

    function hideRootElement() {
        rootElement.classList.remove(isOpenedClassName);
        rootElement.tabIndex = initTabIndex;

        rootElement.removeEventListener('submit', handleSubmit);
        rootElement.removeEventListener('keydown', handleKeydown);
        rootElement.removeEventListener('click', hideRootElement);
        contentElement.removeEventListener('click', handleClickOnContent);
        closeButtonElement.removeEventListener('click', hideRootElement);

        clearFormData();
    }

    function showRootElement() {
        rootElement.classList.add(isOpenedClassName);
        rootElement.tabIndex =
            rootElement.tabIndex === -1 ? 0 : rootElement.tabIndex;

        rootElement.addEventListener('keydown', handleKeydown);
        rootElement.addEventListener('click', hideRootElement);
        rootElement.addEventListener('submit', handleSubmit);
        contentElement.addEventListener('click', handleClickOnContent);
        closeButtonElement.addEventListener('click', hideRootElement);

        setFormData();
    }

    function setFocus() {
        (firstInputElement || closeButtonElement || rootElement).focus();
    }

    showRootElement();
    setFocus();
}

export default { show };

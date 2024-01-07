function init(editCb) {
    const element = document.querySelector('.profile');
    const titleElement = element.querySelector('.profile__title');
    const descriptionElement = element.querySelector('.profile__description');
    const editButtonElement = element.querySelector('.profile__edit-button');

    editButtonElement.addEventListener('click', editCb);

    return {
        get value() {
            const name = titleElement.textContent;
            const description = descriptionElement.textContent;
            return { name, description };
        },
        update({ name, description }) {
            titleElement.textContent = name;
            descriptionElement.textContent = description;
        },
        get element() {
            return element;
        },
    };
}

export default {
    init,
};

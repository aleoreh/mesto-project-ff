function model(name, description) {
    // must match form inputs names
    return {
        name,
        description,
    };
}

function init() {
    const element = document.querySelector('.profile');
    const titleElement = element.querySelector('.profile__title');
    const descriptionElement = element.querySelector('.profile__description');

    return {
        get value() {
            const name = titleElement.textContent;
            const description = descriptionElement.textContent;
            return model(name, description);
        },
        set(title, name) {
            titleElement.textContent = title;
            descriptionElement.textContent = name;
        },
    };
}

export default {
    init,
};

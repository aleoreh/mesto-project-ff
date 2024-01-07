function init(onEditCommand) {
    const element = document.querySelector('.profile');
    const titleElement = element.querySelector('.profile__title');
    const descriptionElement = element.querySelector('.profile__description');
    const editButtonElement = element.querySelector('.profile__edit-button');

    let _name = titleElement.textContent;
    let _description = descriptionElement.textContent;

    const obj = {
        get value() {
            return { name: _name, description: _description };
        },
        set value({ name, description }) {
            _name = name;
            _description = description;
            update();
        },
        get element() {
            return element;
        },
    };

    function update() {
        titleElement.textContent = _name;
        descriptionElement.textContent = _description;
    }

    editButtonElement.addEventListener('click', onEditCommand);

    return obj;
}

export default {
    init,
};

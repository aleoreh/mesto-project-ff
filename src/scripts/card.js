const cardTemplate = document.querySelector('#card-template').content;

function generateAltImageText(value) {
    return `Фотография места: ${value}`;
}

function init({ name, link }, { onImageOpen, onLikeToggle, onDeleteCommand }) {
    const isLikedClassName = 'card__like-button_is-active';
    const element = cardTemplate.querySelector('.card').cloneNode(true);
    const imageElement = element.querySelector('.card__image');
    const titleElement = element.querySelector('.card__title');
    const deleteButtonElement = element.querySelector('.card__delete-button');
    const likeButtonElement = element.querySelector('.card__like-button');

    let _name = name;
    let _link = link;
    let _isLiked = false;

    const obj = {
        get value() {
            return { name: _name, link: _link };
        },
        set value({ name, link }) {
            _name = name;
            _link = link;
            update();
        },
        get isLiked() {
            return _isLiked;
        },
        set isLiked(value) {
            _isLiked = !!value;
            update();
        },
        get altImageText() {
            return generateAltImageText(name);
        },
        toggleLike() {
            _isLiked = !_isLiked;
            update();
        },
        get element() {
            return element;
        },
    };

    function update() {
        imageElement.src = _link;
        imageElement.alt = generateAltImageText(_name);
        titleElement.innerText = _name;
        if (_isLiked) {
            likeButtonElement.classList.add(isLikedClassName);
        } else {
            likeButtonElement.classList.remove(isLikedClassName);
        }
    }

    imageElement.addEventListener('click', () =>
        onImageOpen(_link, generateAltImageText(_name), _name)
    );
    deleteButtonElement.addEventListener('click', () =>
        onDeleteCommand(element)
    );
    likeButtonElement.addEventListener('click', () => onLikeToggle(obj));

    update();

    return obj;
}

export default { init, generateAltImageText };

const cardTemplate = document.querySelector('#card-template').content;
const isLikedClassName = 'card__like-button_is-active';

export function createCardElement(
    { link, name, likes, owner, _id },
    currentProfileId,
    remove,
    like,
    show
) {
    const element = cardTemplate.querySelector('.card').cloneNode(true);

    const imageElement = element.querySelector('.card__image');
    const titleElement = element.querySelector('.card__title');
    const deleteButtonElement = element.querySelector('.card__delete-button');
    const toggleLikeElement = element.querySelector('.card__like-button');
    const likesCountElement = element.querySelector('.card__likes-count');

    element.setAttribute('data-card_id', _id);
    imageElement.src = link;
    imageElement.alt = generateAltImageText(name);
    titleElement.innerText = name;
    if (currentProfileId === owner._id) {
        deleteButtonElement.addEventListener('click', () => remove(element));
        deleteButtonElement.setAttribute(
            'aria-label',
            `Удалить карточку "${name}"`
        );
    } else {
        deleteButtonElement.remove();
    }

    toggleLikeElement.addEventListener('click', () => {
        like(toggleLikeElement);
    });
    toggleLikeElement.setAttribute('aria-label', `Поставить like для: ${name}`);
    imageElement.addEventListener('click', () => show({ link, name }));
    likesCountElement.textContent = likes.length;

    return element;
}

export function toggleLike(toggleLikeElement) {
    toggleLikeElement.classList.toggle(isLikedClassName);
}

export function removeCardElement(cardElement) {
    cardElement.remove();
}

export function generateAltImageText(value) {
    return `Фотография места: ${value}`;
}

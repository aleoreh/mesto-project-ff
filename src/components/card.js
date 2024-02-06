const cardTemplate = document.querySelector('#card-template').content;
const isLikedClassName = 'card__like-button_is-active';

export function createCardElement(card, currentProfileId, remove, like, show) {
    const element = cardTemplate.querySelector('.card').cloneNode(true);
    renderCardElement(element, card, currentProfileId);

    const imageElement = element.querySelector('.card__image');
    const deleteButtonElement = element.querySelector('.card__delete-button');
    const toggleLikeElement = element.querySelector('.card__like-button');

    element.setAttribute('data-card_id', card._id);
    if (currentProfileId === card.owner._id) {
        deleteButtonElement.addEventListener('click', () => remove(element));
        deleteButtonElement.setAttribute(
            'aria-label',
            `Удалить карточку "${card.name}"`
        );
    } else {
        deleteButtonElement.remove();
    }
    toggleLikeElement.addEventListener('click', () => {
        like(element, currentProfileId);
    });
    imageElement.addEventListener('click', () => show(card));

    return element;
}

export function renderCardElement(
    cardElement,
    { link, name, likes },
    currentProfileId
) {
    const hasOwnedLike = likes.some((like) => like._id === currentProfileId);

    const imageElement = cardElement.querySelector('.card__image');
    const titleElement = cardElement.querySelector('.card__title');
    const toggleLikeElement = cardElement.querySelector('.card__like-button');
    const likesCountElement = cardElement.querySelector('.card__likes-count');

    cardElement.setAttribute('data-is_liked', JSON.stringify(hasOwnedLike));
    imageElement.src = link;
    imageElement.alt = generateAltImageText(name);
    titleElement.innerText = name;
    toggleLikeElement.classList.toggle(isLikedClassName, hasOwnedLike);
    toggleLikeElement.setAttribute('aria-label', `Поставить like для: ${name}`);
    likesCountElement.textContent = likes.length;
}

export function getCardId(cardElement) {
    return cardElement.getAttribute('data-card_id');
}

export function getIsLiked(cardElement) {
    return JSON.parse(cardElement.getAttribute('data-is_liked'));
}

export function removeCardElement(cardElement) {
    cardElement.remove();
}

export function generateAltImageText(value) {
    return `Фотография места: ${value}`;
}

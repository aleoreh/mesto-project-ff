const isLikedClassName = 'card__like-button_is-active';

export function createCardElement(
    template,
    { link, name },
    deleteCardElement,
    toggleLike,
    openImage
) {
    const cardElement = template.querySelector('.card').cloneNode(true);

    const imageElement = cardElement.querySelector('.card__image');
    const titleElement = cardElement.querySelector('.card__title');
    const deleteButtonElement = cardElement.querySelector(
        '.card__delete-button'
    );
    const toggleLikeElement = cardElement.querySelector('.card__like-button');

    imageElement.src = link;
    imageElement.alt = `Фотография места: ${name}`;
    titleElement.innerText = name;
    deleteButtonElement.addEventListener('click', () =>
        deleteCardElement(cardElement)
    );
    toggleLikeElement.addEventListener('click', () => {
        toggleLike(toggleLikeElement);
    });
    imageElement.addEventListener('click', () => openImage({ link, name }));
    return cardElement;
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

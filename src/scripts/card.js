const cardTemplate = document.querySelector('#card-template').content;

function init({ link, name }) {
    const element = cardTemplate.querySelector('.card').cloneNode(true);

    const imageElement = element.querySelector('.card__image');
    const titleElement = element.querySelector('.card__title');
    const deleteButtonElement = element.querySelector('.card__delete-button');
    const likeButtonElement = element.querySelector('.card__like-button');

    function generateAltImageText() {
        return `Фотография места: ${name}`;
    }

    return {
        create(showCb, likeCb, deleteCb) {
            imageElement.src = link;
            imageElement.alt = generateAltImageText();
            imageElement.addEventListener('click', showCb);
            titleElement.innerText = name;
            deleteButtonElement.addEventListener('click', () =>
                deleteCb(element)
            );
            likeButtonElement.addEventListener('click', likeCb);

            return element;
        },
        toggleLike() {
            likeButtonElement.classList.toggle('card__like-button_is-active');
        },
        generateAltImageText,
        get value() {
            return { link, name };
        },
    };
}

export default { init };

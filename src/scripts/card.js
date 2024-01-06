const cardTemplate = document.querySelector('#card-template').content;

function init({ link, name }) {
    const element = cardTemplate.querySelector('.card').cloneNode(true);

    const imageElement = element.querySelector('.card__image');
    const titleElement = element.querySelector('.card__title');
    const deleteButtonElement = element.querySelector('.card__delete-button');
    const likeButtonElement = element.querySelector('.card__like-button');

    return {
        create(showCb, likeCb, deleteCb) {
            imageElement.src = link;
            imageElement.alt = generateAltImageText(name);
            imageElement.addEventListener('click', showCb);
            titleElement.innerText = name;
            deleteButtonElement.addEventListener('click', () =>
                deleteCb(element)
            );
            likeButtonElement.addEventListener('click', likeCb);

            return element;
        },
        like() {
            likeButtonElement.classList.toggle('card__like-button_is-active');
        },
    };
}

function generateAltImageText(name) {
    return `Фотография места: ${name}`;
}

export default { init, generateAltImageText };

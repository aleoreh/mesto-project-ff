const CARD_TEMPLATE = document.querySelector("#card-template").content;

function deleteElement(element) {
    element.remove();
}

function createCardElement({ link, name }, deleteCardElement) {
    const cardElement = CARD_TEMPLATE.querySelector(".card").cloneNode(true);

    const imageElement = cardElement.querySelector(".card__image");
    const titleElement = cardElement.querySelector(".card__title");
    const deleteButtonElement = cardElement.querySelector(
        ".card__delete-button"
    );

    imageElement.src = link;
    titleElement.innerText = name;
    deleteButtonElement.addEventListener("click", () =>
        deleteCardElement(cardElement)
    );

    return cardElement;
}

function showCards(cards) {
    const cardsListElement = document.querySelector(".places__list");

    cards.forEach((card) => {
        cardsListElement.appendChild(createCardElement(card, deleteElement));
    });
}

showCards(initialCards);

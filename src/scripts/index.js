import { initialCards } from './cards';
import popup from './popup';

const cardTemplate = document.querySelector('#card-template').content;

function deleteElement(element) {
    element.remove();
}

function createCardElement({ link, name }, deleteCardElement) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const imageElement = cardElement.querySelector('.card__image');
    const titleElement = cardElement.querySelector('.card__title');
    const deleteButtonElement = cardElement.querySelector(
        '.card__delete-button'
    );

    imageElement.src = link;
    imageElement.alt = `Фотография места: ${name}`;
    titleElement.innerText = name;
    deleteButtonElement.addEventListener('click', () =>
        deleteCardElement(cardElement)
    );

    return cardElement;
}

function showCards(cards) {
    const cardsListElement = document.querySelector('.places__list');

    cards.forEach((card) => {
        cardsListElement.appendChild(createCardElement(card, deleteElement));
    });
}

function initializeProfile() {
    const profileEditButton = document.querySelector('.profile__edit-button');
    const editProfilePopup = document.querySelector('.popup.popup_type_edit');

    profileEditButton.addEventListener('click', () => {
        popup.show(editProfilePopup);
    });
}

showCards(initialCards);
initializeProfile();

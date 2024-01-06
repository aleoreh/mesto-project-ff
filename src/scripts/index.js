import { initialCards } from './data';
import PopupForm from './popupForm';
import Profile from './profile';

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
    const profile = Profile.init();

    const profileEditButtonElement = document.querySelector(
        '.profile__edit-button'
    );
    const editProfilePopupElement = document.querySelector(
        '.popup.popup_type_edit'
    );

    function onSubmit(data) {
        profile.set(data.name, data.description);
    }

    profileEditButtonElement.addEventListener('click', () => {
        PopupForm.show(
            editProfilePopupElement,
            document.forms['edit-profile'],
            profile.value,
            onSubmit
        );
    });
}

showCards(initialCards);
initializeProfile();

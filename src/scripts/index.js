import Card from './card';
import { initialCards } from './data';
import PopupForm from './popupForm';
import PopupImage from './popupImage';
import Profile from './profile';

function addCard(cardData, position = 'after') {
    const cardsListElement = document.querySelector('.places__list');
    const showCardPopupElement = document.querySelector(
        '.popup.popup_type_image'
    );

    function onImageOpen(src, alt, caption) {
        PopupImage.show(showCardPopupElement, { src, alt, caption });
    }

    function onLikeToggle(card) {
        card.toggleLike();
    }

    function onDeleteCommand(element) {
        element.remove();
    }

    const card = Card.init(cardData, {
        onImageOpen,
        onLikeToggle,
        onDeleteCommand,
    });

    if (position === 'after') {
        cardsListElement.appendChild(card.element);
    } else {
        cardsListElement.insertBefore(
            card.element,
            cardsListElement.childNodes[0]
        );
    }
}

function initializeCards(cards) {
    cards.forEach(addCard);
}

function initializeProfile() {
    const profile = Profile.init(handleEditClick);
    const editProfilePopupElement = document.querySelector(
        '.popup.popup_type_edit'
    );

    function handleEditClick() {
        PopupForm.show(
            editProfilePopupElement,
            document.forms['edit-profile'],
            profile.value,
            (value) => {
                profile.value = value;
            }
        );
    }
    return profile;
}

function initializeAddCardButton(profile) {
    const newCardPopupElement = document.querySelector(
        '.popup.popup_type_new-card'
    );
    const addButtonElement = profile.element.querySelector(
        '.profile__add-button'
    );
    function handleAddButtonClick() {
        PopupForm.show(
            newCardPopupElement,
            document.forms['new-place'],
            { 'place-name': '', link: '' },
            (data) => {
                addCard(
                    { name: data['place-name'], link: data.link },
                    'before'
                );
            }
        );
    }
    addButtonElement.addEventListener('click', handleAddButtonClick);
}

document.querySelectorAll('.popup').forEach((elem) => {
    elem.classList.add('popup_is-animated');
});

initializeCards(initialCards);
const profile = initializeProfile();
initializeAddCardButton(profile);

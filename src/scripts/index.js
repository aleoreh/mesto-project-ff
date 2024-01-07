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

    function makeImageClickHandler(card) {
        const popupData = {
            src: card.value.link,
            alt: card.generateAltImageText(),
            caption: card.value.name,
        };
        return () => PopupImage.show(showCardPopupElement, popupData);
    }

    const card = Card.init(cardData);
    const cardElement = card.create(
        makeImageClickHandler(card),
        card.toggleLike,
        (element) => element.remove()
    );

    if (position === 'after') {
        cardsListElement.appendChild(cardElement);
    } else {
        cardsListElement.insertBefore(
            cardElement,
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
            profile.update
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

initializeCards(initialCards);
const profile = initializeProfile();
initializeAddCardButton(profile);

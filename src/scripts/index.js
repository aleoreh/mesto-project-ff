import Card from './card';
import { initialCards } from './data';
import PopupForm from './popupForm';
import PopupImage from './popupImage';
import Profile from './profile';

function showCards(cards) {
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

    cards.forEach((cardData) => {
        const card = Card.init(cardData);
        const cardElement = card.create(
            makeImageClickHandler(card),
            card.toggleLike,
            (element) => element.remove()
        );
        cardsListElement.appendChild(cardElement);
    });
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
}

showCards(initialCards);
initializeProfile();

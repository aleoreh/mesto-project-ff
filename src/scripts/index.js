import { initialCards } from './data';
import PopupForm from './popupForm';
import PopupImage from './popupImage';
import Profile from './profile';
import Card from './card';

function showCards(cards) {
    const cardsListElement = document.querySelector('.places__list');
    const showCardPopupElement = document.querySelector(
        '.popup.popup_type_image'
    );

    function makeHandleImageClick(cardData) {
        const popupData = {
            src: cardData.link,
            alt: Card.generateAltImageText(cardData.name),
            caption: cardData.name,
        };
        return () => PopupImage.show(showCardPopupElement, popupData);
    }

    cards.forEach((cardData) => {
        const card = Card.init(cardData);
        const cardElement = card.create(
            makeHandleImageClick(cardData),
            card.like,
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

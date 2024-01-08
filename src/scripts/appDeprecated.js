import Card from './cardDeprecated';
import PopupForm from './popupForm';
import Profile from './profile';

const cardsListElement = document.querySelector('.places__list');

function setAnimatedPopups() {
    document.querySelectorAll('.popup').forEach((elem) => {
        elem.classList.add('popup_is-animated');
    });
}

function addCard(cardData, position = 'after') {
    const card = Card.init(cardData, { ...Card });

    if (position === 'after') {
        cardsListElement.appendChild(card.element);
    } else {
        cardsListElement.prepend(card.element);
    }
}

function initializeCards(cards) {
    cards.forEach(addCard);
}

function initializeProfile() {
    const editProfilePopupElement = document.querySelector(
        '.popup.popup_type_edit'
    );
    function handleEditClick(profile) {
        PopupForm.show(
            editProfilePopupElement,
            document.forms['edit-profile'],
            profile.value,
            (value) => {
                profile.value = value;
            }
        );
    }

    const profile = Profile.init(handleEditClick);

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

setAnimatedPopups();
initializeCards(initialCards);
const profile = initializeProfile();
initializeAddCardButton(profile);


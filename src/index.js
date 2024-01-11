import {
    createCardElement,
    generateAltImageText,
    removeCardElement,
    toggleLike,
} from './components/card';
import { initialCards } from './components/cards';
import { closeModal, openModal } from './components/modal';

import './pages/index.css';

const cardsListElement = document.querySelector('.places__list');

const editProfileFormElement = document.querySelector(
    '.popup__form[name="edit-profile"]'
);
const editProfileNameInputElement = document.querySelector(
    '.popup_type_edit .popup__form .popup__input_type_name'
);
const editProfileDescriptionInputElement = document.querySelector(
    '.popup_type_edit .popup__form .popup__input_type_description'
);

const newPlaceFormElement = document.querySelector(
    '.popup__form[name="new-place"]'
);
const newPlacePlaceNameInputElement = document.querySelector(
    '.popup_type_new-card .popup__form .popup__input_type_card-name'
);
const newPlaceLinkInputElement = document.querySelector(
    '.popup_type_new-card .popup__form .popup__input_type_url'
);

const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector(
    '.profile__description'
);
const profileEditButtonElement = document.querySelector(
    '.profile__edit-button'
);

const addButtonElement = document.querySelector('.profile__add-button');

const popupEditElement = document.querySelector('.popup.popup_type_edit');

const popupNewCardElement = document.querySelector(
    '.popup.popup_type_new-card'
);

const popupShowCardElement = document.querySelector('.popup.popup_type_image');
const popupShowCardImageElement =
    popupShowCardElement.querySelector('.popup__image');
const popupShowCardCaptionElement =
    popupShowCardElement.querySelector('.popup__caption');

function openImage(cardData) {
    popupShowCardImageElement.alt = generateAltImageText(cardData.name);
    popupShowCardImageElement.src = cardData.link;
    popupShowCardCaptionElement.textContent = cardData.name;
    openModal(popupShowCardElement);
}

function handleEditProfileButtonClick() {
    editProfileNameInputElement.value = profileTitleElement.textContent;
    editProfileDescriptionInputElement.value =
        profileDescriptionElement.textContent;
    openModal(popupEditElement);
}

function handleAddButtonClick() {
    newPlaceFormElement.reset();
    openModal(popupNewCardElement);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = editProfileNameInputElement.value;
    const description = editProfileDescriptionInputElement.value;

    profileTitleElement.textContent = name;
    profileDescriptionElement.textContent = description;

    closeModal(popupEditElement);
    editProfileFormElement.reset();
}

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    const cardElement = createCardElement(
        {
            name: newPlacePlaceNameInputElement.value,
            link: newPlaceLinkInputElement.value,
        },
        removeCardElement,
        toggleLike,
        openImage
    );

    closeModal(popupNewCardElement);
    newPlacePlaceNameInputElement.value = '';
    newPlaceLinkInputElement.value = '';

    cardsListElement.prepend(cardElement);
}

addButtonElement.addEventListener('click', handleAddButtonClick);

profileEditButtonElement.addEventListener(
    'click',
    handleEditProfileButtonClick
);

editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);

newPlaceFormElement.addEventListener('submit', handleNewPlaceFormSubmit);

document.querySelectorAll('.popup').forEach((elem) => {
    elem.classList.add('popup_is-animated');
});

initialCards.forEach((cardData) => {
    const cardElement = createCardElement(
        cardData,
        removeCardElement,
        toggleLike,
        openImage
    );
    cardsListElement.appendChild(cardElement);
});

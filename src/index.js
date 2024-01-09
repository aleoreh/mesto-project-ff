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
const addCardElement = document.querySelector('.profile__add-button');
const popupAddCardElement = document.querySelector(
    '.popup.popup_type_new-card'
);
const popupAddCardForm = document.forms['new-place'];

const profileInfoElement = document.querySelector('.profile__info');
const profileEditButtonElement = profileInfoElement.querySelector(
    '.profile__edit-button'
);
const profileTitleElement = profileInfoElement.querySelector('.profile__title');
const profileDescriptionElement = profileInfoElement.querySelector(
    '.profile__description'
);
const popupProfileElement = document.querySelector('.popup.popup_type_edit');
const popupProfileForm = document.forms['edit-profile'];

const popupShowCardElement = document.querySelector('.popup.popup_type_image');
const popupShowCardImageElement =
    popupShowCardElement.querySelector('.popup__image');
const popupShowImageCaptionElement =
    popupShowCardElement.querySelector('.popup__caption');

function setFormData(form, data) {
    Object.keys(data).forEach((key) => {
        form[key].value = data ? data[key] : '';
    });
}

function clearFormData(form) {
    for (let i = 0; i < form.length; i++) {
        form[i].value = '';
    }
}

function openImage(cardData) {
    popupShowCardImageElement.alt = generateAltImageText(cardData.name);
    popupShowCardImageElement.src = cardData.link;
    popupShowImageCaptionElement.textContent = cardData.name;
    openModal(popupShowCardElement);
}

initialCards.forEach((cardData) => {
    const cardElement = createCardElement(
        cardData,
        removeCardElement,
        toggleLike,
        openImage
    );
    cardsListElement.appendChild(cardElement);
});

document.querySelectorAll('.popup').forEach((elem) => {
    elem.classList.add('popup_is-animated');
});

addCardElement.addEventListener('click', () => {
    setFormData(popupAddCardForm, {
        'place-name': '',
        link: '',
    });
    openModal(popupAddCardElement);
});

profileEditButtonElement.addEventListener('click', () => {
    setFormData(popupProfileForm, {
        name: profileTitleElement.textContent,
        description: profileDescriptionElement.textContent,
    });
    openModal(popupProfileElement);
});

function handleProfileSubmit(evt) {
    evt.preventDefault();
    profileTitleElement.textContent = popupProfileForm.name.value;
    profileDescriptionElement.textContent = popupProfileForm.description.value;
    clearFormData(popupProfileForm);
    closeModal(popupProfileElement);
}

popupProfileForm.addEventListener('submit', handleProfileSubmit);

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const cardElement = createCardElement(
        {
            name: popupAddCardForm['place-name'].value,
            link: popupAddCardForm.link.value,
        },
        removeCardElement,
        toggleLike,
        openImage
    );
    cardsListElement.prepend(cardElement);
    clearFormData(popupAddCardForm);
    closeModal(popupAddCardElement);
}

popupAddCardForm.addEventListener('submit', handleAddCardSubmit);

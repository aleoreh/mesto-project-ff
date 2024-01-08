import {
    createCardElement,
    generateAltImageText,
    removeCardElement,
    toggleLike,
} from './components/card';
import { initialCards } from './components/cards';
import { openModal, closeModal } from './components/modal';

import './pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
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

function closeModalAndClearForm(element, form) {
    clearFormData(form);
    closeModal(element);
}

function handlePopupKeydown(evt, element, cb) {
    switch (evt.key) {
        case 'Escape':
            closeModal(element);
            cb();
            break;
        default:
            break;
    }
}

addCardElement.addEventListener('click', () => {
    setFormData(popupAddCardForm, {
        'place-name': '',
        link: '',
    });
    openModal(popupAddCardElement);
});

function openImage(cardData) {
    popupShowCardImageElement.alt = generateAltImageText(cardData.name);
    popupShowCardImageElement.src = cardData.link;
    popupShowImageCaptionElement.textContent = cardData.name;
    openModal(popupShowCardElement);
}

function addCard(cardData, position = 'after') {
    const cardElement = createCardElement(
        cardTemplate,
        cardData,
        removeCardElement,
        toggleLike,
        openImage
    );

    if (position === 'after') {
        cardsListElement.appendChild(cardElement);
    } else {
        cardsListElement.prepend(cardElement);
    }
}

initialCards.forEach((card) => {
    addCard(card);
});

profileEditButtonElement.addEventListener('click', () => {
    setFormData(popupProfileForm, {
        name: profileTitleElement.textContent,
        description: profileDescriptionElement.textContent,
    });
    openModal(popupProfileElement);
});

document.querySelectorAll('.popup').forEach((elem) => {
    elem.classList.add('popup_is-animated');
});

popupShowCardElement.addEventListener('keydown', (evt) => {
    handlePopupKeydown(evt, popupShowCardElement, () => {});
});

popupShowCardElement.addEventListener('click', () => {
    closeModal(popupShowCardElement);
});

popupShowCardElement
    .querySelector('.popup__content')
    .addEventListener('click', (evt) => {
        evt.stopPropagation();
    });

popupShowCardElement
    .querySelector('.popup__close')
    .addEventListener('click', () => {
        closeModal(popupShowCardElement);
    });

function popupKeydownHandler(evt, element, form) {
    handlePopupKeydown(evt, element, () => clearFormData(form));
}

function popupClickHandler(element, form) {
    closeModalAndClearForm(element, form);
}

function popupContentClickHandler(evt) {
    evt.stopPropagation();
}

function popupCloseClickHandler(element, form) {
    closeModalAndClearForm(element, form);
}

[
    [popupProfileElement, popupProfileForm],
    [popupAddCardElement, popupAddCardForm],
].forEach(([element, form]) => {
    element.addEventListener('keydown', (evt) => {
        popupKeydownHandler(evt, element, form);
    });
    element.addEventListener('click', () => {
        popupClickHandler(element, form);
    });
    element
        .querySelector('.popup__content')
        .addEventListener('click', popupContentClickHandler);
    element.querySelector('.popup__close').addEventListener('click', () => {
        popupCloseClickHandler(element, form);
    });
});

function handleProfileSubmit(evt) {
    evt.preventDefault();
    profileTitleElement.textContent = popupProfileForm.name.value;
    profileDescriptionElement.textContent = popupProfileForm.description.value;
    closeModalAndClearForm(popupProfileElement, popupProfileForm);
}

popupProfileForm.addEventListener('submit', handleProfileSubmit);

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    addCard(
        {
            name: popupAddCardForm['place-name'].value,
            link: popupAddCardForm.link.value,
        },
        'before'
    );
    closeModalAndClearForm(popupAddCardElement, popupAddCardForm);
}

popupAddCardForm.addEventListener('submit', handleAddCardSubmit);

import {
    createCardElement,
    generateAltImageText,
    removeCardElement,
    toggleLike,
} from './components/card';
import { initialCards } from './cards';
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

function closeModalWithClear(element, form) {
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

profileEditButtonElement.addEventListener('click', () => {
    setFormData(popupProfileForm, {
        name: profileTitleElement.textContent,
        description: profileDescriptionElement.textContent,
    });
    openModal(popupProfileElement);
});

popupProfileElement.addEventListener('keydown', (evt) => {
    handlePopupKeydown(evt, popupProfileElement, () =>
        clearFormData(popupProfileForm)
    );
});

popupProfileElement.addEventListener('click', () => {
    closeModalWithClear(popupProfileElement, popupProfileForm);
});

popupProfileElement
    .querySelector('.popup__content')
    .addEventListener('click', (evt) => {
        evt.stopPropagation();
    });

popupProfileElement
    .querySelector('.popup__close')
    .addEventListener('click', () => {
        closeModalWithClear(popupProfileElement, popupProfileForm);
    });

function handleProfileSubmit(evt) {
    evt.preventDefault();
    profileTitleElement.textContent = popupProfileForm.name.value;
    profileDescriptionElement.textContent = popupProfileForm.description.value;
    closeModalWithClear(popupProfileElement, popupProfileForm);
}

popupProfileForm.addEventListener('submit', handleProfileSubmit);

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

addCardElement.addEventListener('click', () => {
    setFormData(popupAddCardForm, {
        'place-name': '',
        link: '',
    });
    openModal(popupAddCardElement);
});

popupAddCardElement.addEventListener('keydown', (evt) => {
    handlePopupKeydown(evt, popupAddCardElement, () =>
        clearFormData(popupAddCardForm)
    );
});

popupAddCardElement.addEventListener('click', () => {
    closeModalWithClear(popupAddCardElement, popupAddCardForm);
});

popupAddCardElement
    .querySelector('.popup__content')
    .addEventListener('click', (evt) => {
        evt.stopPropagation();
    });

popupAddCardElement
    .querySelector('.popup__close')
    .addEventListener('click', () => {
        closeModalWithClear(popupAddCardElement, popupAddCardForm);
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

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    addCard(
        {
            name: popupAddCardForm['place-name'].value,
            link: popupAddCardForm.link.value,
        },
        'before'
    );
    closeModalWithClear(popupAddCardElement, popupAddCardForm);
}

popupAddCardForm.addEventListener('submit', handleAddCardSubmit);

initialCards.forEach((card) => {
    addCard(card);
});

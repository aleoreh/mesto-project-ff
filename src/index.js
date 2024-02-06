import {
    addLike,
    deleteCard,
    getInitialCards,
    getProfileInfo,
    patchProfileInfo,
    postCard,
    removeLike,
} from './components/api';
import {
    createCardElement,
    generateAltImageText,
    getCardId,
    getIsLiked,
    removeCardElement,
    renderCardElement,
} from './components/card';
import { closeModal, openModal } from './components/modal';
import { clearValidation, enableValidation } from './components/validation';

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

const profileInfoElement = document.querySelector('.profile__info');
const profileImageElement = document.querySelector('.profile__image');
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

const errorTemplate = document.querySelector('#http-error-template').content;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

function handleHttpError(reason) {
    const existingErrors = Array.from(document.querySelectorAll('.http-error'));
    existingErrors.forEach((errElem) => {
        errElem.remove();
    });

    const rootElement = errorTemplate
        .querySelector('.http-error')
        .cloneNode(true);
    const messageElement = rootElement.querySelector('.http-error__message');
    messageElement.textContent = reason;
    const closeButtonElement = rootElement.querySelector('.http-error__close');
    closeButtonElement.addEventListener('click', () => {
        rootElement.remove();
    });

    document.body.appendChild(rootElement);
}

function getProfileId(infoElement) {
    return infoElement.getAttribute('data-profile_id');
}

async function deleteCardQuery(cardElement) {
    try {
        await deleteCard(getCardId(cardElement));
        removeCardElement(cardElement);
    } catch (err) {
        handleHttpError(err);
    }
}

async function toggleLikeQuery(cardElement, profileId) {
    const cardId = getCardId(cardElement);
    try {
        const card = getIsLiked(cardElement)
            ? await removeLike(cardId)
            : await addLike(cardId);
        renderCardElement(cardElement, card, profileId);
    } catch (err) {
        handleHttpError(err);
    }
}

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
    clearValidation(
        popupEditElement.querySelector(validationConfig.formSelector),
        validationConfig
    );
}

function handleAddButtonClick() {
    newPlaceFormElement.reset();
    openModal(popupNewCardElement);
    clearValidation(
        popupNewCardElement.querySelector(validationConfig.formSelector),
        validationConfig
    );
}

async function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const currentName = editProfileNameInputElement.value;
    const currentAbout = editProfileDescriptionInputElement.value;

    try {
        const { name, about } = await patchProfileInfo({
            name: currentName,
            about: currentAbout,
        });
        profileTitleElement.textContent = name;
        profileDescriptionElement.textContent = about;
        closeModal(popupEditElement);
        editProfileFormElement.reset();
    } catch (err) {
        handleHttpError(err);
    }
}

async function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();

    try {
        const res = await postCard({
            name: newPlacePlaceNameInputElement.value,
            link: newPlaceLinkInputElement.value,
        });
        const cardElement = createCardElement(
            res,
            getProfileId(profileInfoElement),
            deleteCardQuery,
            toggleLikeQuery,
            openImage
        );

        closeModal(popupNewCardElement);
        newPlacePlaceNameInputElement.value = '';
        newPlaceLinkInputElement.value = '';

        cardsListElement.prepend(cardElement);
    } catch (err) {
        handleHttpError(err);
    }
}

function renderProfileInfo({ name, about, avatar, _id }) {
    profileImageElement.style.backgroundImage = `url('${avatar}')`;
    profileTitleElement.textContent = name;
    profileDescriptionElement.textContent = about;
    profileInfoElement.setAttribute('data-profile_id', _id);
}

function renderInitialCards(initialCards) {
    initialCards.forEach((cardData) => {
        const cardElement = createCardElement(
            cardData,
            getProfileId(profileInfoElement),
            deleteCardQuery,
            toggleLikeQuery,
            openImage
        );
        cardsListElement.appendChild(cardElement);
    });
}

async function getInitialData() {
    try {
        const [profileInfo, initialCards] = await Promise.all([
            getProfileInfo(),
            getInitialCards(),
        ]);

        renderProfileInfo(profileInfo);
        renderInitialCards(initialCards);
    } catch (err) {
        handleHttpError(err);
    }
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

getInitialData();

enableValidation(validationConfig);

import {
    addLike,
    deleteCard,
    getInitialCards,
    getProfileInfo,
    patchProfileInfo,
    postCard,
    removeLike,
    updateAvatar,
    checkIfImage,
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
import {
    clearValidation,
    enableValidation,
    hideInputError,
    showInputError,
} from './components/validation';

import './pages/index.css';

// TODO: set value on initialization
let profile = {
    value: undefined,
    set(value) {
        this.value = value;
        renderProfileInfo(value);
    },
};

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

const editAvatarFormElement = document.querySelector(
    '.popup_type_avatar-edit .popup__form'
);

const editAvatarUrlInputElement = document.querySelector(
    '.popup_type_avatar-edit .popup__form .popup__input_type_avatar-url'
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

const deleteConfirmFormElement = document.querySelector(
    '.popup__form[name="delete-confirm"]'
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

const popupEditAvatarElement = document.querySelector(
    '.popup.popup_type_avatar-edit'
);

const popupNewCardElement = document.querySelector(
    '.popup.popup_type_new-card'
);

const popupShowCardElement = document.querySelector('.popup.popup_type_image');
const popupShowCardImageElement =
    popupShowCardElement.querySelector('.popup__image');
const popupShowCardCaptionElement =
    popupShowCardElement.querySelector('.popup__caption');

const popupDeleteConfirmElement = document.querySelector(
    '.popup.popup_type_delete-confirm'
);

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

function handleError(reason) {
    console.log(reason);
    throw reason;
}

function getProfileId(infoElement) {
    return infoElement.getAttribute('data-profile_id');
}

function deleteCardQuery(cardElement) {
    const cardId = getCardId(cardElement);
    popupDeleteConfirmElement.setAttribute('data-card_id', cardId);
    openModal(popupDeleteConfirmElement);
}

async function toggleLikeQuery(cardElement, profileId) {
    const cardId = getCardId(cardElement);
    try {
        const card = getIsLiked(cardElement)
            ? await removeLike(cardId)
            : await addLike(cardId);
        renderCardElement(cardElement, card, profileId);
    } catch (err) {
        handleError(err);
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

function handleEditAvatarButtonClick() {
    editAvatarUrlInputElement.value = profile.value.avatar;
    openModal(popupEditAvatarElement);
    clearValidation(
        popupEditAvatarElement.querySelector(validationConfig.formSelector),
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

function beginFormSubmit(submitEvent, formElement, asyncAction, next) {
    submitEvent.preventDefault();

    const submitElement = formElement.querySelector('button[type="submit"]');
    const prevTextContent = submitElement.textContent;
    submitElement.textContent = 'Сохранение...';

    asyncAction()
        .then(next)
        .catch(handleError)
        .finally(() => {
            submitElement.textContent = prevTextContent;
        });
}

function handleProfileFormSubmit(evt) {
    const currentName = editProfileNameInputElement.value;
    const currentAbout = editProfileDescriptionInputElement.value;

    const submitAction = () =>
        patchProfileInfo({
            name: currentName,
            about: currentAbout,
        });
    const next = ({ name, about }) => {
        profileTitleElement.textContent = name;
        profileDescriptionElement.textContent = about;
        closeModal(popupEditElement);
        editProfileFormElement.reset();
    };

    beginFormSubmit(evt, editProfileFormElement, submitAction, next);
}

function handleAvatarFormSubmit(evt) {
    const enteredUrl = editAvatarUrlInputElement.value;

    const submitAction = () =>
        checkIfImage(enteredUrl).then((isImage) => {
            if (!isImage) {
                showInputError({
                    formElement: editAvatarFormElement,
                    inputElement: editAvatarUrlInputElement,
                    errorMessage: 'Это не изображение',
                    ...validationConfig,
                });
                return Promise.resolve(undefined);
            }

            return updateAvatar(enteredUrl);
        });
    const next = (newAvatar) => {
        if (newAvatar !== undefined) {
            profile.set({ ...profile.value, avatar: newAvatar.avatar });
            closeModal(popupEditAvatarElement);
            editAvatarFormElement.reset();
            hideInputError({
                formElement: editAvatarFormElement,
                inputElement: editAvatarUrlInputElement,
                ...validationConfig,
            });
        }
    };

    beginFormSubmit(evt, editAvatarFormElement, submitAction, next);
}

function handleNewPlaceFormSubmit(evt) {
    const submitAction = () =>
        postCard({
            name: newPlacePlaceNameInputElement.value,
            link: newPlaceLinkInputElement.value,
        });
    const next = (card) => {
        const cardElement = createCardElement(
            card,
            getProfileId(profileInfoElement),
            deleteCardQuery,
            toggleLikeQuery,
            openImage
        );

        closeModal(popupNewCardElement);
        newPlacePlaceNameInputElement.value = '';
        newPlaceLinkInputElement.value = '';

        cardsListElement.prepend(cardElement);
    };

    beginFormSubmit(evt, newPlaceFormElement, submitAction, next);
}

function handleDeleteConfirmFormSubmit(evt) {
    const cardId = popupDeleteConfirmElement.getAttribute('data-card_id');
    const cardElement = document.querySelector(`li[data-card_id="${cardId}"]`);

    const action = () =>
        deleteCard(cardId)
            .then(() => {
                removeCardElement(cardElement);
            })
            .catch(handleError)
            .finally(() => {
                popupDeleteConfirmElement.setAttribute('data-card_id', '');
                closeModal(popupDeleteConfirmElement);
            });

    const next = () => {};

    beginFormSubmit(evt, deleteConfirmFormElement, action, next);
}

function renderProfileInfo({ name, about, avatar, _id }) {
    profileImageElement.style.backgroundImage = `url('${avatar}')`;
    profileImageElement.addEventListener('click', handleEditAvatarButtonClick);
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
            getProfileInfo().then((value) => {
                profile.set(value);
                return value;
            }),
            getInitialCards(),
        ]);

        profile.set(profileInfo);
        renderInitialCards(initialCards);
    } catch (err) {
        handleError(err);
    }
}

addButtonElement.addEventListener('click', handleAddButtonClick);

profileEditButtonElement.addEventListener(
    'click',
    handleEditProfileButtonClick
);

editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);

editAvatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

newPlaceFormElement.addEventListener('submit', handleNewPlaceFormSubmit);

deleteConfirmFormElement.addEventListener(
    'submit',
    handleDeleteConfirmFormSubmit
);

document.querySelectorAll('.popup').forEach((elem) => {
    elem.classList.add('popup_is-animated');
});

getInitialData();

enableValidation(validationConfig);

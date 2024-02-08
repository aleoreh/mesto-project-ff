const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
        authorization: 'f7b85faf-647d-49f4-9714-9c79aa77ce34',
        'Content-Type': 'application/json',
    },
    url(path) {
        return `${this.baseUrl}/${path}`;
    },
};

async function getJson(response, reason) {
    const json = await response.json();

    if (response.ok) return json;

    const comment =
        response.status === 400
            ? 'неверные данные'
            : response.status === 401
            ? 'ошибка аутентификации'
            : response.status === 403
            ? 'доступ запрещён'
            : response.status === 404
            ? 'адрес не найден'
            : response.status >= 400 && response.status < 500
            ? 'переданы неверные данные'
            : response.status >= 500 && response.status < 600
            ? 'ошибка на стороне сервера'
            : 'неизвестная ошибка';

    const message = (json?.message && `. ${json.message}`) || '';
    return Promise.reject(`${reason}: ${comment}${message}`);
}

export async function getInitialCards() {
    const res = await fetch(config.url('cards'), { headers: config.headers });
    return getJson(res, 'Не удалось получить список карточек');
}

export async function getProfileInfo() {
    const res = await fetch(config.url('users/me'), {
        headers: config.headers,
    });
    return getJson(res, 'Не удалось получить данные пользователя');
}

export async function patchProfileInfo(profileInfo) {
    const res = await fetch(config.url('users/me'), {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(profileInfo),
    });
    return getJson(res, 'Не удалось отправить профиль для изменения');
}

export async function postCard(card) {
    const res = await fetch(config.url('cards'), {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(card),
    });
    return getJson(res, 'Не удалось отправить новую карточку');
}

export async function deleteCard(cardId) {
    const res = await fetch(config.url(`cards/${cardId}`), {
        method: 'DELETE',
        headers: config.headers,
    });
    return getJson(res, 'Не удалось выполнить запрос на удаление карточки');
}

async function setLike(cardId, likeValue) {
    const res = await fetch(config.url(`cards/likes/${cardId}`), {
        method: likeValue ? 'PUT' : 'DELETE',
        headers: config.headers,
    });
    return getJson(
        res,
        `Не удалось отправить запрос на ${
            likeValue ? 'установку' : 'снятие'
        } лайка`
    );
}

export async function addLike(cardId) {
    return setLike(cardId, true);
}

export async function removeLike(cardId) {
    return setLike(cardId, false);
}

export async function updateAvatar(link) {
    const res = await fetch(config.url('users/me/avatar'), {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({ avatar: link }),
    });
    return getJson(res, 'Не удалось отправить запрос на изменение аватара');
}

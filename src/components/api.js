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
    if (response.ok) return response.json();

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

    return Promise.reject(`${reason} (${comment})`);
}

async function getInitialCards() {
    const res = await fetch(config.url('cards'), { headers: config.headers });
    return getJson(res, 'Не удалось получить список карточек');
}

async function getProfileInfo() {
    const res = await fetch(config.url('users/me'), {
        headers: config.headers,
    });
    return getJson(res, 'Не удалось получить данные пользователя');
}

async function patchProfileInfo(profileInfo) {
    const res = await fetch(config.url('users/me'), {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(profileInfo),
    });
    return getJson(res, 'Не удалось отправить профиль для изменения');
}

async function postCard(card) {
    const res = await fetch(config.url('cards'), {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(card),
    });
    return getJson(res, 'Не удалось отправить новую карточку');
}

export { getInitialCards, getProfileInfo, patchProfileInfo, postCard };

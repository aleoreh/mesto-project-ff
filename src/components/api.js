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

function getJson(response, reason) {
    return !response.ok ? Promise.reject(reason) : response.json();
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

export { getInitialCards, getProfileInfo };

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

function getInitialCards() {
    return fetch(config.url('cards'), { headers: config.headers }).then(
        (res) => {
            if (!res.ok)
                return Promise.reject('Не удалось получить список карточек');
            return res.json();
        }
    );
}

function getProfileInfo() {
    return fetch(config.url('users/me'), { headers: config.headers }).then(
        (res) => {
            if (!res.ok)
                return Promise.reject(
                    'Не удалось получить данные пользователя'
                );
            return res.json();
        }
    );
}

export { getInitialCards, getProfileInfo };

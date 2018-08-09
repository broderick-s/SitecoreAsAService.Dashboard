const getData = (url = '') => {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Fetch Error =\n', error));
}

const postData = (url = '', data = {}) => {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.error('Fetch Error =\n', error));
}

export { getData, postData };
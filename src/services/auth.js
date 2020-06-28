const API_URL = 'http://localhost:4000/api';

async function logIn(username, password) {
    const request = await fetch(`${API_URL}/log-in`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify({ username, password }),
    });
    const user = await request.json();
    if (user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
    return user;
}

function logOut() {
    localStorage.removeItem('currentUser');
}

function getUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

export default { logIn, logOut, getUser };

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function LogInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ message: '' });

    const history = useHistory();
    const logIn = async (e) => {
        e.preventDefault();
        console.log(username, password);
        const request = await fetch('http://localhost:4000/api/log-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ username, password }),
        });
        const currentUser = await request.json();
        console.log(currentUser);
        if (currentUser.token) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            history.push('/home');
            window.location.reload();
            return;
        }
        console.log(localStorage);
        setError(currentUser);
        setPassword('');
    };

    return (
        <div>
            <h2>Log in to create and edit your posts.</h2>
            <form className="log-in-form" onSubmit={(e) => logIn(e)}>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    name="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Log in </button>
            </form>
            <p>{error.message}</p>
        </div>
    );
}

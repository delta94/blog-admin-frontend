import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function LogInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ message: '' });

    const history = useHistory();
    const logIn = async (e) => {
        e.preventDefault();
        const request = await fetch('/api/log-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify({ username, password }),
        });
        const currentUser = await request.json();
        if (currentUser.token) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            history.push('/home');
            window.location.reload();
            return;
        }
        setError(currentUser);
        setPassword('');
    };

    return (
        <>
            <form className="log-in-form" onSubmit={(e) => logIn(e)}>
                <p>{error.message}</p>
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
        </>
    );
}

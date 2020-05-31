import React, { useState } from 'react';

export default function LogInForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const logIn = async () => {
        const request = await fetch('http://localhost:4000/api/log-in', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({ username, password }),
        });
        const logged = await request.json();
        console.log(logged);
    };

    return (
        <div>
            <h2>Log in to create and edit your posts.</h2>
            <form className="log-in-form" action="/" onSubmit={logIn}>
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
        </div>
    );
}

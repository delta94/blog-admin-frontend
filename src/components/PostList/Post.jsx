import React, { useState } from 'react';
import authHeader from '../../services/authHeader';
import PublishBtn from './PublishBtn';

export default function Post({ title, timestamp, last_update, published, _id }) {
    const [publishedState, setPublishedState] = useState(published);
    const changePublishedStatus = async (e) => {
        e.preventDefault();
        const request = await fetch(
            `http://localhost:4000/api/post/${_id}/update-published-status`,
            {
                method: 'put',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', Authorization: authHeader() },
                body: JSON.stringify({
                    published: !published,
                }),
            },
        );
        console.log(request);
        const response = await request.json();
        console.log(response);
        setPublishedState(!published);
    };

    return (
        <article className="post">
            <h2>{title}</h2>
            <p>
                <span className="date">Created on {timestamp} </span>
                <span className="last-update">| Last updated on: {last_update}</span>
            </p>
            <PublishBtn published={published} handleSubmit={changePublishedStatus} />
        </article>
    );
}

import React from 'react';
import authHeader from '../../services/authHeader';
import PublishBtn from './PublishBtn';
import { useHistory } from 'react-router-dom';

export default function Post({ title, timestamp, last_update, published, _id, currentUser }) {
    const changePublishedStatus = async (e) => {
        e.preventDefault();
        try {
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
            const response = await request.json();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const history = useHistory();

    const handleClick = async () => {
        const request = await fetch(`http://localhost:4000/api/post/${_id}`);
        const response = await request.json();
        const { title, text, published } = response;
        history.push({ pathname: `/${_id}/edit`, state: { title, text, published } });
    };

    return (
        <article className="post">
            <h2>{title}</h2>
            <p>
                <span className="date">Created on {timestamp} </span>
                <span className="last-update">
                    | Last updated on: {last_update || 'This post has not received any updates.'}
                </span>
            </p>
            {currentUser && (
                <div className="action-btns">
                    <PublishBtn published={published} handleSubmit={changePublishedStatus} />
                    <button type="button" className="edit-btn" onClick={handleClick}>
                        Edit
                    </button>
                </div>
            )}
        </article>
    );
}

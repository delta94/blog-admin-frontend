import React, { useState } from 'react';
import authHeader from '../../services/authHeader';
import PublishBtn from './PublishBtn';
import DeleteConfirmation from './DeleteConfirmation';
import { useHistory } from 'react-router-dom';
import ActionBtns from './ActionBtns';

export default function Post({ title, timestamp, last_update, published, _id, currentUser }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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

    const editPost = async () => {
        const request = await fetch(`http://localhost:4000/api/post/${_id}`);
        const response = await request.json();
        const { title, text, published } = response;
        history.push({ pathname: `/${_id}/edit`, state: { title, text, published } });
    };

    return (
        <>
            <article className="post">
                <h2>{title}</h2>
                <p>
                    <span className="date">Created on {timestamp} </span>
                    <span className="last-update">
                        | Last updated on:{' '}
                        {last_update || 'This post has not received any updates.'}
                    </span>
                </p>
                {currentUser && (
                    <ActionBtns
                        published={published}
                        changePublishedStatus={changePublishedStatus}
                        editPost={editPost}
                        setShowDeleteConfirm={setShowDeleteConfirm}
                    />
                )}
            </article>
            <DeleteConfirmation
                showDeleteConfirm={showDeleteConfirm}
                handleClick={() => setShowDeleteConfirm(false)}
                postId={_id}
            />
        </>
    );
}

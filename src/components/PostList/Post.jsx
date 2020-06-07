import React, { useState } from 'react';
import authHeader from '../../services/authHeader';
import DeleteConfirmation from './DeleteConfirmation';
import { useHistory } from 'react-router-dom';
import ActionBtns from './ActionBtns';

export default function Post({
    title,
    timestamp,
    last_update,
    published,
    _id,
    currentUser,
    image,
}) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const history = useHistory();

    const changePublishedStatus = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
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
            const data = await response.json();
            console.log(data);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const editPost = async () => {
        const response = await fetch(`http://localhost:4000/api/post/${_id}`);
        const data = await response.json();
        const { title, text, published } = data;
        history.push({
            pathname: `/post/${_id}/edit`,
            state: { title, text, published, _id, image },
        });
    };

    const openComments = async () => {
        const response = await fetch(`http://localhost:4000/api/post/${_id}/comments`);
        const comments = await response.json();
        history.push({ pathname: `/post/${_id}/comments`, state: { comments } });
    };

    return (
        <>
            <article className="post">
                <h2>{title}</h2>
                <figure>
                    <img src={image} alt="" />
                    <figcaption>
                        <p className="timestamps">
                            <span className="date">Created on {timestamp} </span>
                            <span className="last-update">
                                Last updated on: {last_update || 'No updates yet.'}
                            </span>
                        </p>
                    </figcaption>
                </figure>
                {currentUser && (
                    <ActionBtns
                        published={published}
                        changePublishedStatus={changePublishedStatus}
                        editPost={editPost}
                        setShowDeleteConfirm={setShowDeleteConfirm}
                        openComments={openComments}
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

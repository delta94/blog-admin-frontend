import React, { useState } from 'react';
import authHeader from '../../services/authHeader';

export default function Comment({ postId, commentId, username, timestamp, text }) {
    const [deletedMsg, setdeletedMsg] = useState('');
    const [comment, setComment] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [showActionBtns, setShowActionBtns] = useState(true);
    const editComment = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:4000/api/post/${postId}/comments/${commentId}`,
            {
                method: 'put',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', Authorization: authHeader() },
                body: JSON.stringify({ comment }),
            },
        );
        const data = await response.json();
        setComment(data.text);
        setShowEditForm(!showEditForm);
    };

    const deleteBtn = async () => {
        try {
            const response = await fetch(
                `https://julio22b-blog-api-1.glitch.me/api/post/${postId}/comments/${commentId}`,
                {
                    method: 'delete',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json', Authorization: authHeader() },
                },
            );
            const data = await response.json();
            setdeletedMsg(data.message);
            setShowActionBtns(!showActionBtns);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <article className="comment">
            <div>
                <h5>{username}</h5>
                <span className="date">{timestamp}</span>
            </div>
            <p className="comment-text">{comment || text}</p>
            {showActionBtns && (
                <div className="buttons">
                    <button
                        className="edit-btn"
                        onClick={() => setShowEditForm(!showEditForm)}
                        type="button"
                    >
                        Edit
                    </button>
                    <button className="delete-btn" onClick={deleteBtn} type="button">
                        Delete
                    </button>
                </div>
            )}
            <p>{deletedMsg}</p>
            <form className={showEditForm ? 'active' : ''} onSubmit={(e) => editComment(e)}>
                <textarea
                    name="comment"
                    cols="30"
                    rows="5"
                    onChange={(e) => setComment(e.target.value)}
                    defaultValue={text}
                ></textarea>
                <button>Send</button>
            </form>
        </article>
    );
}

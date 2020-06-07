import React, { useState } from 'react';
import authHeader from '../../services/authHeader';

export default function Comment(postId, commentId, username, timestamp, text) {
    console.log(postId, username, text, timestamp);
    const editBtn = async (commentId) => {
        const response = await fetch(
            `http://localhost:4000/api/post/${postId}/comments/${commentId}`,
            {
                method: 'put',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json', Authorization: authHeader() },
            },
        );
        const data = await response.json();
        console.log(data);
    };

    const deleteBtn = async () => {};
    return (
        <article className="comment">
            <div>
                <h5>{username}</h5>
                <span className="date">{timestamp}</span>
            </div>
            <p>{text}</p>
            <div className="buttons">
                <button className="edit-btn" onClick={() => editBtn(commentId)} type="button">
                    Edit
                </button>
                <button className="delete-btn" onClick={deleteBtn} type="button">
                    Delete
                </button>
            </div>
        </article>
    );
}

import React from 'react';
import PublishBtn from './PublishBtn';

export default function ActionBtns({
    published,
    changePublishedStatus,
    editPost,
    setShowDeleteConfirm,
    openComments,
}) {
    return (
        <div className="action-btns">
            <PublishBtn published={published} handleSubmit={changePublishedStatus} />
            <div className="delete-edit-wrapper">
                <button type="button" className="edit-btn" onClick={openComments}>
                    See comments
                </button>
                <button type="button" className="edit-btn" onClick={editPost}>
                    Edit
                </button>
                <button
                    type="button"
                    className="delete-btn"
                    onClick={() => setShowDeleteConfirm(true)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

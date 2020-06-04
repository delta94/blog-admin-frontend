import React from 'react';

export default function PublishBtn({ handleSubmit, published }) {
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            {published ? (
                <div className="unpublish-wrapper">
                    <p>This post is published.</p>
                    <button>Unpublish</button>
                </div>
            ) : (
                <div className="publish-wrapper">
                    <p>This post hasn't been published.</p>
                    <button>Publish</button>
                </div>
            )}
        </form>
    );
}

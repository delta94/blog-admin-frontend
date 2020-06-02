import React from 'react';

export default function PublishBtn({ handleSubmit, published }) {
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="create-form">
            {published ? (
                <div className="unpublish-wrapper">
                    <p>Published: Yes</p>
                    <button>Unpublish</button>
                </div>
            ) : (
                <div className="publish-wrapper">
                    <p>Published: No</p>
                    <button>Publish</button>
                </div>
            )}
        </form>
    );
}

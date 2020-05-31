import React from 'react';

export default function Post({ title, timestamp, last_update, published }) {
    return (
        <article className="post">
            <h2>{title}</h2>
            <p>
                <span className="date">{timestamp}</span>
                <span className="last-update">{last_update}</span>
            </p>
            <p>Published: {published ? 'Yes' : 'No'}</p>
        </article>
    );
}

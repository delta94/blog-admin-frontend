import React, { useState, useEffect } from 'react';
import Comment from './Comment';

export default function Comments({ location, match }) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const getComments = async () => {
            try {
                const response = await fetch(
                    `https://julio22b-blog-api-1.glitch.me/api/post/${match.params.id}/comments`,
                );
                const commentsData = await response.json();
                setComments(commentsData);
            } catch (err) {
                console.log(err);
            }
        };
        getComments();
    }, [match.params.id]);

    return (
        <section className="comments-section">
            {comments.map((comment) => (
                <Comment
                    postId={match.params.id}
                    commentId={comment._id}
                    username={comment.username}
                    text={comment.text}
                    timestamp={comment.timestamp}
                    key={comment._id}
                />
            ))}
        </section>
    );
}

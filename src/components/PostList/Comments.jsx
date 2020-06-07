import React, { useState, useEffect } from 'react';
import Comment from './Comment';

export default function Comments({ location, match }) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        const getComments = async () => {
            const response = await fetch(
                `http://localhost:4000/api/post/${match.params.id}/comments`,
            );
            const commentsData = await response.json();
            console.log(commentsData);
            setComments(commentsData);
            console.log(comments);
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

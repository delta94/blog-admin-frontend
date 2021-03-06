import React, { useState, useEffect } from 'react';
import Post from './Post';

export default function PostList({ currentUser }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const request = await fetch('https://julio22b-blog-api-1.glitch.me/api/posts');
            const posts = await request.json();
            setPosts(posts);
        };
        getPosts();
    }, []);

    return (
        <>
            <section className="post-list">
                {posts.map((post) => (
                    <Post
                        title={post.title}
                        timestamp={post.timestamp}
                        last_update={post.last_update}
                        published={post.published}
                        key={post._id}
                        _id={post._id}
                        currentUser={currentUser}
                        image={post.image}
                    />
                ))}
            </section>
        </>
    );
}

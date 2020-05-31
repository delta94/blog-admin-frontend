import React, { useState, useEffect } from 'react';
import Post from './Post';

export default function PostList() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const getPosts = async () => {
            const request = await fetch('http://localhost:4000/api/posts');
            const posts = await request.json();
            console.log(posts);
            setPosts(posts);
        };
        getPosts();
    }, []);
    return (
        <section className="post-list">
            {posts.map((post) => (
                <Post
                    title={post.title}
                    timestamp={post.timestamp}
                    last_update={post.last_update}
                    published={post.published}
                    key={post._id}
                />
            ))}
        </section>
    );
}

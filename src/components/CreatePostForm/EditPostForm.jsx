import React, { useState } from 'react';
import PostForm from './PostForm';
import authHeader from '../../services/authHeader';
import { useHistory } from 'react-router-dom';

export default function EditPostForm({ location }) {
    const [title, setTitle] = useState(location.state.title || '');
    const [text, setText] = useState(location.state.text || '');
    const [published, setPublished] = useState(location.state.published);
    const [image, setImage] = useState(location.state.image || '');
    const [message, setMessage] = useState('');
    const history = useHistory();

    window.scrollTo(0, 0);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const request = await fetch(
                `https://julio22b-blog-api-1.glitch.me/api/post/${location.state._id}/update`,
                {
                    method: 'put',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json', Authorization: authHeader() },
                    body: JSON.stringify({ title, text, published, image }),
                },
            );
            const response = await request.json();
            console.log(response);
            setMessage(response.msg);
            history.push('/home');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <p>{message}</p>
            <PostForm
                handleSubmit={handleSubmit}
                state={location.state}
                setTitle={setTitle}
                setText={setText}
                setPublished={setPublished}
                setImage={setImage}
                image={image}
                btnText={'Edit Post'}
            />
        </>
    );
}

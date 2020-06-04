import React, { useState } from 'react';
import PostForm from './PostForm';
import authHeader from '../../services/authHeader';
import { useHistory } from 'react-router-dom';

export default function EditPostForm({ location }) {
    const [title, setTitle] = useState(location.state.title || '');
    const [text, setText] = useState(location.state.text || '');
    const [published, setPublished] = useState(location.state.published);
    const [message, setMessage] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const request = await fetch(
                `http://localhost:4000/api/post/${location.state._id}/update`,
                {
                    method: 'put',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json', Authorization: authHeader() },
                    body: JSON.stringify({ title, text, published }),
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
                btnText={'Edit Post'}
            />
        </>
    );
}

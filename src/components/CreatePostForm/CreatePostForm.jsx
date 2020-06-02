import React, { useState } from 'react';
import RadioInput from './RadioInput';
import authHeader from '../../services/authHeader';

export default function CreatePostForm() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [published, setPublished] = useState(true);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const formData = {
                title,
                text,
                published,
            };
            const request = await fetch('http://localhost:4000/api/post/create', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', Authorization: authHeader() },
                mode: 'cors',
                body: JSON.stringify(formData),
            });
            const response = await request.json();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            className="create-form"
            onSubmit={(e) => handleSubmit(e)}
            encType="multipart/form-data"
        >
            <label htmlFor="title">Title: </label>
            <input
                type="text"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="text">Content: </label>
            <textarea
                name="text"
                cols="30"
                rows="10"
                required
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <label htmlFor="image">Image: </label>
            <input type="file" name="image" />
            <p>Publish?</p>
            <label htmlFor="published">Yes</label>
            <RadioInput value={'true'} handleChange={(e) => setPublished(e.target.value)} />
            <label htmlFor="published">No</label>
            <RadioInput value={'false'} handleChange={(e) => setPublished(e.target.value)} />
            <button>Create Post</button>
        </form>
    );
}

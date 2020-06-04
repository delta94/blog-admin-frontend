import React, { useState, useRef } from 'react';
import RadioInput from './RadioInput';
import authHeader from '../../services/authHeader';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useHistory } from 'react-router-dom';

export default function CreatePostForm({ location }) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [published, setPublished] = useState(true);
    const history = useHistory();

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
            history.push('/home');
        } catch (error) {
            console.log(error);
        }
    };

    const editorRef = useRef();

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
                value={location.state ? location.state.title : title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="text">Content: </label>
            <Editor
                previewStyle="vertical"
                initialEditType="markdown"
                height="700px"
                events={{ change: () => setText(editorRef.current.getInstance().getMarkdown()) }}
                ref={editorRef}
                initialValue={location.state ? location.state.text : ''}
            />
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

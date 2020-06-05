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
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const postData = {
                title,
                text,
                published,
                image,
            };

            console.log(postData);
            const request = await fetch('http://localhost:4000/api/post/create', {
                method: 'post',
                headers: { 'Content-Type': 'application/json', Authorization: authHeader() },
                mode: 'cors',
                body: JSON.stringify(postData),
            });
            const response = await request.json();
            if (request.status === 400) {
                setErrors(response);
                window.scrollTo(0, 0);
                return;
            } else {
                console.log(response);
                history.push('/home');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editorRef = useRef();

    const handleFile = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        console.log(reader);
    };
    return (
        <>
            <ul className="errors">
                {errors.length > 0
                    ? errors.map((error) => <li key={error.msg}>{error.msg}</li>)
                    : ''}
            </ul>
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
                    events={{
                        change: () => setText(editorRef.current.getInstance().getMarkdown()),
                    }}
                    ref={editorRef}
                    initialValue={location.state ? location.state.text : ''}
                />
                <label htmlFor="image">Image: </label>
                <input
                    type="file"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => handleFile(e)}
                />
                <div className="image-container">
                    <img src={imagePreview} alt="" />
                </div>
                <div className="radio-btns">
                    <p>Publish?</p>
                    <div>
                        <label htmlFor="published">Yes</label>
                        <RadioInput
                            value={'true'}
                            handleChange={(e) => setPublished(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="published">No</label>
                        <RadioInput
                            value={'false'}
                            handleChange={(e) => setPublished(e.target.value)}
                        />
                    </div>
                </div>
                <button>Create Post</button>
            </form>
        </>
    );
}

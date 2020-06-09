import React, { useRef } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import RadioInput from './RadioInput';

export default function PostForm({
    handleSubmit,
    state,
    setTitle,
    setText,
    setPublished,
    setImage,
    image,
    btnText,
}) {
    const editorRef = useRef();
    const handleFile = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
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
                defaultValue={state ? state.title : ''}
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="text">Content: </label>
            <Editor
                previewStyle="vertical"
                initialEditType="markdown"
                height="700px"
                events={{ change: () => setText(editorRef.current.getInstance().getMarkdown()) }}
                ref={editorRef}
                initialValue={state ? state.text : ''}
            />
            <label htmlFor="image">Image: </label>
            <input type="file" name="image" onChange={(e) => handleFile(e)} />
            <div className="image-container">
                <img src={image} alt="" />
            </div>
            <div className="radio-btns">
                <p>Publish?</p>
                <div>
                    <label htmlFor="published">Yes</label>
                    <RadioInput value={'true'} handleChange={(e) => setPublished(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="published">No</label>
                    <RadioInput
                        value={'false'}
                        handleChange={(e) => setPublished(e.target.value)}
                    />
                </div>
            </div>
            <button>{btnText}</button>
        </form>
    );
}

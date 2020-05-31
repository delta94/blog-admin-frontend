import React from 'react';

export default function RadioInput({ value, handleChange }) {
    return <input type="radio" name="published" value={value} onChange={handleChange} />;
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/blogs/', { title, content });
      navigate('/');
    } catch (err) {
      console.error('Error creating blog:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Blog</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateBlog;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}/`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error('Failed to load blog:', err);
        setError('Failed to load blog');
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/blogs/${id}/`, {
        title,
        content,
      });
      alert('Blog updated successfully!');
      navigate('/'); 
    } catch (err) {
      console.error('Failed to update blog:', err);
      setError('Failed to update blog');
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="edit-blog" style={{ maxWidth: '700px', margin: 'auto', padding: '1rem' }}>
      <h2>Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}/`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error('Error fetching blog:', err);
        alert('Not allowed or blog not found');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put(`/blogs/${id}/`, { title, content });
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error('Error updating blog:', err);
      alert('Update failed');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem', maxWidth: '700px', margin: 'auto' }}>
      <h2>Edit Blog</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="10"
        style={{ width: '100%', padding: '0.5rem' }}
      />
      <button
        onClick={handleUpdate}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        Update
      </button>
    </div>
  );
}

export default EditBlog;

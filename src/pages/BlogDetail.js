import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

function BlogDetail() {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null); 
  const [error, setError] = useState(null); 
  const [currentUser, setCurrentUser] = useState(null); // ✅ Add this
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}/`);
        setBlog(res.data);
      } catch (err) {
        console.error('Failed to load blog:', err);
        setError('Failed to load blog');
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await api.get('/auth/users/me/');
          setCurrentUser(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchBlog();
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/blogs/${id}/`);
      alert('Blog deleted successfully!');
      navigate('/blogs');
    } catch (err) {
      console.error('Failed to delete blog:', err);
      alert('Failed to delete blog');
    }
  };

  if (error) return <p>{error}</p>;
  if (!blog) return <p>Loading blog...</p>;

  return (
    <div className="blog-detail" style={{ maxWidth: '700px', margin: 'auto', padding: '1rem' }}>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p><strong>Author:</strong> {blog.author.username}</p>

      {currentUser && currentUser.username === blog.author.username && (
        <div style={{ marginTop: '1rem' }}>
          <Link to={`/edit/${blog.id}`}>
            <button style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}>
              Edit
            </button>
          </Link>
          <button onClick={handleDelete} style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogDetail;

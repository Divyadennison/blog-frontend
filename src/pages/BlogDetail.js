import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

function BlogDetail() {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null); // Store blog data
  const [currentUser, setCurrentUser] = useState(null); // Store current user data
  const [error, setError] = useState(null); // Store error message

  useEffect(() => {
    // Fetch blog details
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}/`); // Fetch blog by ID
        setBlog(res.data); // Set blog data
      } catch (err) {
        console.error('Failed to load blog:', err);
        setError('Failed to load blog'); // Set error message if fetching fails
      }
    };

    // Fetch the current logged-in user
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await api.get('/auth/users/me/'); // Get current user details
          setCurrentUser(res.data); // Set current user data
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchBlog();
    fetchUser();
  }, [id]);

  // Show error message if there's an issue fetching the blog
  if (error) return <p>{error}</p>;

  // Show loading message until blog is fetched
  if (!blog) return <p>Loading blog...</p>;

  return (
    <div className="blog-detail" style={{ maxWidth: '700px', margin: 'auto', padding: '1rem' }}>
      <h2>{blog.title}</h2> {/* Display blog title */}
      <p>{blog.content}</p> {/* Display blog content */}
      <p><strong>Author:</strong> {blog.author.username}</p> {/* Display author's username */}

      {/* Show Edit button if the current user is the author of the blog */}
      {currentUser && currentUser.username === blog.author.username && (
        <Link to={`/edit/${blog.id}`}>
          <button style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Edit
          </button>
        </Link>
      )}
    </div>
  );
}

export default BlogDetail;

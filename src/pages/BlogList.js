import React, { useEffect, useState } from 'react';
import axiosInstance from '../api';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async (url = '/blogs/') => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(url);
      const data = response.data;
      setBlogs(data.results || []);
      setNextPage(data.next?.replace('https://blog-backend-z9hh.onrender.com/api', '') || null);
      setPrevPage(data.previous?.replace('https://blog-backend-z9hh.onrender.com/api', '') || null);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <h2>Latest Blogs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <>
          <ul>
            {blogs.map(blog => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}><strong>{blog.title}</strong></Link>
                <p>by {blog.author.username}</p>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '10px' }}>
            {prevPage && <button onClick={() => fetchBlogs(prevPage)}>Previous</button>}
            {nextPage && <button onClick={() => fetchBlogs(nextPage)}>Next</button>}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogList;

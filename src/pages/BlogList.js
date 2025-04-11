import React, { useEffect, useState } from 'react';
import axiosInstance from '../api';
import { Link } from 'react-router-dom';

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState('/blogs/');

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(currentPageUrl)
      .then(response => {
        if (response.data.results) {
          setBlogs(response.data.results);
          setNextPage(response.data.next?.replace('https://blog-backend-z9hh.onrender.com/api', '') || null);
          setPrevPage(response.data.previous?.replace('https://blog-backend-z9hh.onrender.com/api', '') || null);
        } else {
          setBlogs([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, [currentPageUrl]);

  return (
    <div>
      <h2>Latest Blogs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : blogs.length > 0 ? (
        <>
          {blogs.map(blog => (
            <div key={blog.id} style={{ marginBottom: '1rem' }}>
              <h3>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </h3>
              <p>{blog.content.slice(0, 100)}...</p>
              <small>Author: {blog.author.username}</small>
            </div>
          ))}

          <div style={{ marginTop: '1rem' }}>
            {prevPage && <button onClick={() => setCurrentPageUrl(prevPage)}>Previous</button>}
            {nextPage && <button onClick={() => setCurrentPageUrl(nextPage)} style={{ marginLeft: '10px' }}>Next</button>}
          </div>
        </>
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
}

export default BlogList;

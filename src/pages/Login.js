import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Step 1: Get token
      const res = await api.post('/auth/token/login/', { username, password });
      const token = res.data.auth_token;
      localStorage.setItem('token', token);

      // Step 2: Set token header for future requests
      api.defaults.headers.common['Authorization'] = `Token ${token}`;

      // Step 3: Fetch user info
      const userRes = await api.get('/auth/users/me/');
      localStorage.setItem('user', JSON.stringify(userRes.data));

      // Step 4: Redirect to homepage
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

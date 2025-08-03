import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed. Check email or password.');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#121212',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
    width: '100%',
    maxWidth: '400px',
  },
  heading: {
    color: '#ffffff',
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#2a2a2a',
    color: '#e0e0e0',
    fontSize: '15px',
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#6200ea',
    color: '#fff',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  }
};

export default LoginPage;

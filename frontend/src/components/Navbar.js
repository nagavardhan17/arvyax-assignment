import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import arvyaxLogo from '../assets/arvyax-logo.png'; // ✅ make sure this exists and is not empty

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <img src={arvyaxLogo} alt="Arvyax" style={styles.logo} />
        <span style={styles.brand}>Arvyax Wellness App</span>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" style={styles.link}>Home</Link>
            <Link to="/my-sessions" style={styles.link}>My Sessions</Link>
            <Link to="/editor" style={styles.link}>Editor</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#111',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #333',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '32px',
    marginRight: '10px',
  },
  brand: {
    color: '#00ff99',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'Segoe UI, sans-serif',
    letterSpacing: '1px',
  },
  link: {
    color: '#ddd',
    marginRight: '15px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#333',
    color: '#eee',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Navbar;

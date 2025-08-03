import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Add Session',
      description: 'Create and publish new wellness sessions',
      route: '/editor',
    },
    {
      title: 'My Sessions',
      description: 'View and manage your personal sessions',
      route: '/my-sessions',
    },
    {
      title: 'Dashboard',
      description: 'Explore all published sessions',
      route: '/dashboard',
    }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to Arvyax Wellness Platform</h2>
      <div style={styles.cardContainer}>
        {features.map((f, index) => (
          <div key={index} style={styles.card} onClick={() => navigate(f.route)}>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#121212',
    minHeight: '100vh',
    color: '#fff'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #333',
    width: '250px',
    cursor: 'pointer',
    transition: '0.3s',
    boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
  }
};

export default LandingPage;

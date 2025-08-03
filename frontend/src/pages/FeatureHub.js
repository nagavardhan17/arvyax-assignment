import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeatureHub = () => {
  const navigate = useNavigate();

  const features = [
    { title: "Add New Session", path: "/editor" },
    { title: "View My Sessions", path: "/my-sessions" },
    { title: "Published Sessions", path: "/real-dashboard" }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to Arvyax Wellness Platform</h2>
      <div style={styles.grid}>
        {features.map((f, idx) => (
          <div key={idx} style={styles.card} onClick={() => navigate(f.path)}>
            <h3>{f.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#121212',
    color: '#f0f0f0',
    padding: '40px',
    minHeight: '90vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '24px',
  },
  grid: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
    width: '220px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  cardHover: {
    transform: 'scale(1.03)',
  }
};

export default FeatureHub;

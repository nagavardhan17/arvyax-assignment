import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SessionCard from '../components/SessionCard';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sessions');
        setSessions(res.data);
      } catch (err) {
        console.error('❌ Error fetching sessions:', err);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Wellness Sessions</h2>
      <div style={styles.cardGrid}>
        {sessions
          .filter((s) => s.status === 'published')
          .map((s) => (
            <SessionCard key={s._id} session={s} />
          ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#121212',
    minHeight: '100vh',
    color: '#e0e0e0'
  },
  heading: {
    marginBottom: '20px',
    color: '#ffffff',
  },
  cardGrid: {
    display: 'grid',
    gap: '15px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'
  }
};

export default Dashboard;

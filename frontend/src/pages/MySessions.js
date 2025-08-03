import React, { useEffect, useState } from 'react';
import API from '../services/api'; // ✅ Corrected import
import SessionCard from '../components/SessionCard';
import { useNavigate } from 'react-router-dom';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await API.get('/my-sessions');
      setSessions(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Failed to load sessions');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/my-sessions/${id}`);
      setSessions(sessions.filter((s) => s._id !== id));
    } catch (err) {
      alert('❌ Failed to delete session');
    }
  };

  const handleEdit = (session) => {
    localStorage.setItem('editingSession', JSON.stringify(session));
    navigate('/editor');
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>My Sessions</h2>
      <div className="card-container">
        {sessions.map((session) => (
          <SessionCard
            key={session._id}
            session={session}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default MySessions;

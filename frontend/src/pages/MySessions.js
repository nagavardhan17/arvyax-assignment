import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SessionCard from '../components/SessionCard';
import { useNavigate } from 'react-router-dom';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/my-sessions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSessions(res.data);
    } catch (err) {
      alert('Failed to load sessions');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/my-sessions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

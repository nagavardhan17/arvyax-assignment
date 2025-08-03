import React, { useState, useEffect } from 'react';
import API from '../services/api';
import SessionCard from '../components/SessionCard';

const SessionEditor = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [jsonFileUrl, setJsonFileUrl] = useState('');
  const [myPublished, setMyPublished] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchMySessions = async () => {
    try {
      const res = await API.get('/my-sessions');
      const published = res.data.filter((s) => s.status === 'published');
      setMyPublished(published);
    } catch (err) {
      alert('❌ Failed to fetch sessions');
    }
  };

  const handlePublish = async () => {
    try {
      if (editingId) {
        await API.patch(`/my-sessions/${editingId}`, {
          title,
          tags: tags.split(',').map((t) => t.trim()),
          json_file_url: jsonFileUrl
        });
        alert('✅ Session updated');
        setEditingId(null);
      } else {
        await API.post('/my-sessions/publish', {
          title,
          tags: tags.split(',').map((t) => t.trim()),
          json_file_url: jsonFileUrl
        });
        alert('✅ Session published');
      }

      setTitle('');
      setTags('');
      setJsonFileUrl('');
      fetchMySessions();
    } catch (err) {
      alert('❌ Failed to publish/update session');
    }
  };

  const handleEdit = (session) => {
    setEditingId(session._id);
    setTitle(session.title);
    setTags(session.tags.join(', '));
    setJsonFileUrl(session.json_file_url);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchMySessions();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', minHeight: '100vh', color: '#e0e0e0' }}>
      <h2>{editingId ? 'Edit Session' : 'Create New Session'}</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={styles.input}
        />
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          style={styles.input}
        />
        <input
          value={jsonFileUrl}
          onChange={(e) => setJsonFileUrl(e.target.value)}
          placeholder="YouTube URL"
          style={styles.input}
        />
        <button onClick={handlePublish} style={styles.button}>
          {editingId ? 'Update' : 'Publish'}
        </button>
      </div>

      <h3>My Published Sessions</h3>
      <div className="card-container">
        {myPublished.map((session) => (
          <SessionCard key={session._id} session={session} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  input: {
    display: 'block',
    marginBottom: '10px',
    padding: '10px',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: '5px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#6200ea',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default SessionEditor;

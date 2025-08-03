import React from 'react';

const SessionCard = ({ session, onDelete, onEdit }) => {
  const { _id, title = 'Untitled Session', tags = [], status = 'draft', json_file_url } = session;

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.text}>Tags: {tags.length ? tags.join(', ') : 'None'}</p>
      <p style={styles.text}>Status: {status}</p>

      {json_file_url && (
        <a
          href={json_file_url}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          Open session
        </a>
      )}

      {onEdit && (
        <button style={styles.button} onClick={() => onEdit(session)}>Edit</button>
      )}
      {onDelete && (
        <button style={{ ...styles.button, backgroundColor: '#e74c3c' }} onClick={() => onDelete(_id)}>
          Delete
        </button>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    border: '1px solid #333',
    borderRadius: '10px',
    marginBottom: '15px',
    color: '#e0e0e0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  text: {
    fontSize: '14px',
    marginBottom: '8px',
  },
  button: {
    marginTop: '10px',
    marginRight: '10px',
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  link: {
    display: 'inline-block',
    marginTop: '10px',
    textDecoration: 'none',
    color: '#00acee',
    fontWeight: 'bold',
  }
};

export default SessionCard;

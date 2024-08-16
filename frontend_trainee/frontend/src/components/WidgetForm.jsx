

import React, { useState } from 'react';

const WidgetForm = ({ onAdd, onCancel }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleAdd = () => {
    if (widgetName && widgetText) {
      onAdd(widgetName, widgetText);
      setWidgetName('');
      setWidgetText('');
    }
  };

  const styles = {
    container: {
      width: '400px',
      height: '400px',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      boxSizing: 'border-box'
    },
    inputGroup: {
      width: '100%',
      marginBottom: '15px',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc'
    },
    textarea: {
      width: '100%',
      height: '60px',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc'
    },
    buttonContainer: {
      marginTop: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    },
    button: {
      padding: '8px 15px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#007bff',
      color: '#fff'
    },
    cancelButton: {
      backgroundColor: 'red'
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={{ marginBottom: '20px' }}>Add Widget</h3>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Widget Name:</label>
        <input
          type="text"
          value={widgetName}
          onChange={(e) => setWidgetName(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Widget Text:</label>
        <textarea
          value={widgetText}
          onChange={(e) => setWidgetText(e.target.value)}
          style={styles.textarea}
        />
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={handleAdd} style={styles.button}>
          Add
        </button>
        <button onClick={onCancel} style={{ ...styles.button, ...styles.cancelButton }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WidgetForm;

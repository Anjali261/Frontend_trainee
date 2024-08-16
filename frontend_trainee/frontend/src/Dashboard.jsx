
import React, { useState } from 'react';
import WidgetForm from './components/WidgetForm';
import initialData from "./data.json";

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  },
  title: { margin: 0 },
  actions: {
    display: 'flex',
    gap: '10px'
  },
  searchInput: { padding: '5px' },
  button: {
    padding: '5px 10px',
    cursor: 'pointer'
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    padding: '10px',
    backgroundColor: '#F2EEF5',
  },
  category: {
    gridColumn: 'span 3',
    padding: '10px',
    borderRadius: '5px',
  },
  widgetsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px'
  },
  widget: {
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    border: '1px solid #ddd',
    position: 'relative'
  },
  removeButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    border: 'none',
    background: 'none'
  },
  addWidgetButton: {
    padding: '10px',
    backgroundColor: '#ddd',
    border: '1px solid #ccc',
    cursor: 'pointer',
    textAlign: 'center',
    borderRadius: '5px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
  }
};

const Dashboard = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const addWidget = (name, text) => {
    const newWidget = {
      id: Date.now().toString(),
      name,
      text
    };
    setData((prevData) => ({
      ...prevData,
      categories: prevData.categories.map((category) =>
        category.id === currentCategory
          ? { ...category, widgets: [...category.widgets, newWidget] }
          : category
      )
    }));
    setIsAdding(false);
    setCurrentCategory(null);
  };

  const handleRefresh = () => {
    setData(initialData);
  };

  const removeWidget = (categoryId, widgetId) => {
    setData((prevData) => ({
      ...prevData,
      categories: prevData.categories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: category.widgets.filter((widget) => widget.id !== widgetId) }
          : category
      )
    }));
  };

  const filteredCategories = data.categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div>
      <header style={styles.header}>
        <h1 style={styles.title}>CNAPP Dashboard</h1>
        <div style={styles.actions}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <button style={styles.button} onClick={handleRefresh}>Refresh</button>
          <button
            style={styles.button}
            onClick={() => {
              // Set currentCategory to null so the new widget can be added to any category selected in the modal
              setCurrentCategory(null);
              setIsAdding(true);
            }}
          >
            + Add Widget
          </button>
          <button style={styles.button}>Last 2 Days</button>
        </div>
      </header>
      <div style={styles.dashboardGrid}>
        {filteredCategories.map((category) => (
          <div key={category.id} style={styles.category}>
            <h2>{category.name}</h2>
            <div style={styles.widgetsGrid}>
              {category.widgets.map((widget) => (
                <div key={widget.id} style={styles.widget}>
                  <h3>{widget.name}</h3>
                  <p>{widget.text}</p>
                  <button
                    style={styles.removeButton}
                    onClick={() => removeWidget(category.id, widget.id)}
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button
                style={styles.addWidgetButton}
                onClick={() => {
                  setCurrentCategory(category.id);
                  setIsAdding(true);
                }}
              >
                + Add Widget
              </button>
            </div>
          </div>
        ))}
      </div>
      {isAdding && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <WidgetForm
              onAdd={addWidget}
              onCancel={() => setIsAdding(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

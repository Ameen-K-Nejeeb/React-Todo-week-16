

import React, { useState, useEffect } from 'react';

function MenuItem() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [deadline, setDeadline] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  // Specification (d): Toast/Alert notification for passed deadlines
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      list.forEach(item => {
        if (item.date && !item.isCompleted) {
          const taskDate = new Date(item.date);
          if (taskDate < now) {
            alert(`Deadline passed for: ${item.text}`);
          }
        }
      });
    }, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [list]);

  const addOrUpdate = () => {
    if (name.trim() === "") return;

    if (editIndex !== null) {
      // Specification (a): Update
      const updateList = list.map((item, index) =>
        index === editIndex ? { ...item, text: name, date: deadline } : item
      );
      setList(updateList);
      setEditIndex(null);
    } else {
      // Specification (a) & (c): Add with Deadline
      setList([...list, { text: name, isCompleted: false, date: deadline }]);
    }

    setName('');
    setDeadline(''); // Clear date after adding
  };

  const deleteItem = (indexToDelete) => {
    setList(list.filter((_, index) => index !== indexToDelete));
  };

  const startEdit = (index) => {
    setName(list[index].text);
    setDeadline(list[index].date || ''); // Put the date back in the input for editing
    setEditIndex(index);
  };

  const toggleComplete = (indexToToggle) => {
  const updateList = list.map((item, index) =>
    index === indexToToggle
      ? { ...item, isCompleted: !item.isCompleted }
      : item
  );
  setList(updateList);
};

  return (
    <div className="todo-container" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h1>My Tasks</h1>

      <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          value={name}
          onChange={handleChange}
          placeholder="Enter a task ..."
        />

        {/* Specification (c): Set deadlines */}
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <button onClick={addOrUpdate} style={{ padding: '10px' }}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>

        <ul className="todo-list" style={{ listStyle: 'none', padding: 0 }}>
          {list.map((item, index) => (
            <li key={index} className="todo-item" style={{ display: 'flex', alignItems: 'center', margin: '15px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>

              <button onClick={() => toggleComplete(index)} style={{ cursor: 'pointer' }}>
                {item.isCompleted ? '✓' : '○'}
              </button>

              <div style={{ flexGrow: 1, marginLeft: '10px' }}>
                <div style={{
                  textDecoration: item.isCompleted ? 'line-through' : 'none',
                  color: item.isCompleted ? 'gray' : 'black'
                }}>
                  {item.text}
                </div>
                {item.date && (
                  <small style={{ color: 'red', fontSize: '11px' }}>
                    Due: {new Date(item.date).toLocaleString()}
                  </small>
                )}
              </div>

              <div style={{ display: 'flex', gap: '5px' }}>
                <button onClick={() => startEdit(index)}>Edit</button>
                <button onClick={() => deleteItem(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { MenuItem };
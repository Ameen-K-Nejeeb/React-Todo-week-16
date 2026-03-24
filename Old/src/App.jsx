import React, { useState } from 'react';
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);

  const [inputValue, setInputValue] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);


  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(), 
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue(''); 
  };


  const handleEditClick = (todo) => {
    setIsEditing(true);
    setEditId(todo.id);
    setInputValue(todo.text);
  };


  const handleUpdateTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const updatedTodos = todos.map((todo) =>
      todo.id === editId ? { ...todo, text: inputValue } : todo
    );

    setTodos(updatedTodos);
    setIsEditing(false);
    setEditId(null);
    setInputValue(''); 
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="header">Task Master</h1>
        
        <form 
          className="input-container" 
          onSubmit={isEditing ? handleUpdateTodo : handleAddTodo}
        >
          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="action-btn submit-btn">
            {isEditing ? 'Update' : 'Add'}
          </button>
        </form>

        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="empty-state">No tasks yet. Add one above!</li>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <div className="todo-content" onClick={() => handleToggleComplete(todo.id)}>
                  <span className="checkbox">{todo.completed ? '✓' : '○'}</span>
                  <span className="todo-text">{todo.text}</span>
                </div>
                <div className="todo-actions">
                  <button 
                    className="action-btn edit-btn" 
                    onClick={() => handleEditClick(todo)}
                    disabled={todo.completed}
                  >
                    ✎
                  </button>
                  <button 
                    className="action-btn delete-btn" 
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    ✖
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
 
  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      setTasks([...tasks, taskText.trim()]);
      setTaskText('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditText(tasks[index]);
  };

  const handleSaveEdit = () => {
    if (editText.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editText.trim();
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditText('');
    }
  };

  return (
    <div className="todo-list-container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={taskText}
          onChange={handleInputChange}
          placeholder="Add your new todo"
        />
        <button onClick={handleAddTask} className="add-btn">+</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                />
                <button onClick={handleSaveEdit} className="save-btn">Save</button>
              </>
            ) : (
              <>
                <span>{task}</span>
                <button onClick={() => handleEditTask(index)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteTask(index)} className="delete-btn">
                  <i className="fas fa-trash"></i>
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="task-summary">
        You have {tasks.length} pending tasks
        <button onClick={() => setTasks([])} className="clear-btn">Clear All</button>
      </div>
    </div>
  );
}

export default TodoList;

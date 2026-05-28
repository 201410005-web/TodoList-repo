import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('media');
  const API_URL = 'http://localhost:3000/tasks';

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status: 'pendiente', priority })
      });

      if (response.status === 201) {
        setTitle('');
        setPriority('media');
        fetchTasks();
      }
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const nuevoStatus = currentStatus === 'pendiente' ? 'completada' : 'pendiente';
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nuevoStatus })
      });

      if (response.status === 200) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      if (response.status === 200) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  return (
    <div className="todo-container">
      <h1 className="main-title">To Do List</h1>
     
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="¿Alguna tarea  pendiente?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <button type="submit">Agregar</button>
      </form>

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="no-tasks">No hay tareas registradas en la base de datos.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={`task-item ${task.status}`}>
              <div className="task-info">
                <span className="task-title">{task.title}</span>
                <div className="task-metadata">
                  <span className={`badge priority-${task.priority}`}>Prioridad: {task.priority}</span>
                  <span className="badge status-text">Estado: {task.status}</span>
                  <span className="time-text">Creado: {new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="task-actions">
                <button 
                  onClick={() => handleToggleStatus(task.id, task.status)}
                  className="btn-status"
                >
                  {task.status === 'pendiente' ? 'Completar' : 'Reabrir'}
                </button>
                <button onClick={() => handleDelete(task.id)} className="btn-delete">
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

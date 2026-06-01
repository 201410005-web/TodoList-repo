import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

      console.error(error);

    }

  };

  useEffect(() => {

    if (loggedIn) {

      fetchTasks();

    }

  }, [loggedIn]);



  const handleRegister = async () => {

    try {

      const response = await fetch(
        'http://localhost:3000/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await response.json();

      alert(data.message || data.error);

    } catch (error) {

      console.error(error);

    }

  };



  const handleLogin = async () => {

    try {

      const response = await fetch(
        'http://localhost:3000/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await response.json();

      if (response.status === 200) {

        setLoggedIn(true);

      } else {

        alert(data.error);

      }

    } catch (error) {

      console.error(error);

    }

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!title.trim()) return;

    try {

      const response = await fetch(
        API_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title,
            status: 'pendiente',
            priority
          })
        }
      );

      if (response.status === 201) {

        setTitle('');

        setPriority('media');

        fetchTasks();

      }

    } catch (error) {

      console.error(error);

    }

  };



  const handleToggleStatus = async (
    id,
    currentStatus
  ) => {

    const nuevoStatus =
      currentStatus === 'pendiente'
        ? 'completada'
        : 'pendiente';

    try {

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: nuevoStatus
          })
        }
      );

      if (response.status === 200) {

        fetchTasks();

      }

    } catch (error) {

      console.error(error);

    }

  };



  const handleDelete = async (id) => {

    try {

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: 'DELETE'
        }
      );

      if (response.status === 200) {

        fetchTasks();

      }

    } catch (error) {

      console.error(error);

    }

  };



  if (!loggedIn) {

    return (

      <div className="todo-container">

        <h1 className="main-title">
          To Do List Login
        </h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >

          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            className="btn-status"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </button>

          <button
            className="btn-delete"
            onClick={handleRegister}
          >
            Registrarse
          </button>

        </div>

      </div>

    );

  }



  return (

    <div className="todo-container">

      <h1 className="main-title">
        To Do List
      </h1>

      <form
        onSubmit={handleSubmit}
        className="todo-form"
      >

        <input
          type="text"
          placeholder="¿Alguna tarea pendiente?"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >

          <option value="baja">
            Baja
          </option>

          <option value="media">
            Media
          </option>

          <option value="alta">
            Alta
          </option>

        </select>

        <button type="submit">
          Agregar
        </button>

      </form>

      <div className="tasks-list">

        {tasks.length === 0 ? (

          <p className="no-tasks">
            No hay tareas registradas.
          </p>

        ) : (

          tasks.map((task) => (

            <div
              key={task.id}
              className={`task-item ${task.status}`}
            >

              <div className="task-info">

                <span className="task-title">
                  {task.title}
                </span>

                <div className="task-metadata">

                  <span>
                    Prioridad: {task.priority}
                  </span>

                  <span>
                    Estado: {task.status}
                  </span>

                  <span>
                    Creado:
                    {' '}
                    {new Date(
                      task.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

              </div>

              <div className="task-actions">

                <button
                  className="btn-status"
                  onClick={() =>
                    handleToggleStatus(
                      task.id,
                      task.status
                    )
                  }
                >
                  {task.status === 'pendiente'
                    ? 'Completar'
                    : 'Reabrir'}
                </button>

                <button
                  className="btn-delete"
                  onClick={() =>
                    handleDelete(task.id)
                  }
                >
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


import { useState, useEffect } from 'react';

import './App.css';

import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';

import {
    login,
    register,
    getTasks,
    createTask,
    deleteTask,
    toggleTask
} from './services/api';

function App() {

    const [loggedIn, setLoggedIn] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState('');

    const [priority, setPriority] =
        useState('media');



    const fetchTasks = async () => {

        try {

            const data =
                await getTasks();

            if (Array.isArray(data)) {

                setTasks(data);

            }

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

            const data =
                await register(
                    username,
                    password
                );

            alert(
                data.message ||
                data.error
            );

        } catch (error) {

            console.error(error);

        }

    };



    const handleLogin = async () => {

        try {

            const data =
                await login(
                    username,
                    password
                );

            if (
                data.message ===
                'Login correcto'
            ) {

                setLoggedIn(true);

            } else {

                alert(data.error);

            }

        } catch (error) {

            console.error(error);

        }

    };



    const handleSubmit =
        async (e) => {

        e.preventDefault();

        if (!title.trim()) return;

        try {

            await createTask(
                title,
                priority
            );

            setTitle('');

            setPriority('media');

            fetchTasks();

        } catch (error) {

            console.error(error);

        }

    };



    const handleDelete =
        async (id) => {

        try {

            await deleteTask(id);

            fetchTasks();

        } catch (error) {

            console.error(error);

        }

    };



    const handleToggleStatus =
        async (
            id,
            status
        ) => {

        try {

            await toggleTask(
                id,
                status
            );

            fetchTasks();

        } catch (error) {

            console.error(error);

        }

    };



    if (!loggedIn) {

        return (

            <LoginPage

                username={username}
                password={password}

                setUsername={
                    setUsername
                }

                setPassword={
                    setPassword
                }

                handleLogin={
                    handleLogin
                }

                handleRegister={
                    handleRegister
                }

            />

        );

    }



    return (

        <TasksPage

            tasks={tasks}

            title={title}

            priority={priority}

            setTitle={setTitle}

            setPriority={
                setPriority
            }

            handleSubmit={
                handleSubmit
            }

            handleDelete={
                handleDelete
            }

            handleToggleStatus={
                handleToggleStatus
            }

        />

    );

}

export default App;
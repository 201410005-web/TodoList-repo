const API_URL = 'https://localhost:3000';

export const login = async (username, password) => {

    const response = await fetch(
        `${API_URL}/login`,
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

    if (data.token) {

        localStorage.setItem(
            'token',
            data.token
        );

    }

    return data;
};

export const register = async (username, password) => {

    const response = await fetch(
        `${API_URL}/register`,
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

    return response.json();
};

export const getTasks = async () => {

    const token =
        localStorage.getItem('token');

    const response = await fetch(
        `${API_URL}/tasks`,
        {
            headers: {
                Authorization: token
            }
        }
    );

    return response.json();
};

export const createTask = async (
    title,
    priority
) => {

    const token =
        localStorage.getItem('token');

    const response = await fetch(
        `${API_URL}/tasks`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({
                title,
                status: 'pendiente',
                priority
            })
        }
    );

    return response.json();
};

export const deleteTask = async (id) => {

    const token =
        localStorage.getItem('token');

    const response = await fetch(
        `${API_URL}/tasks/${id}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: token
            }
        }
    );

    return response.json();
};

export const toggleTask = async (
    id,
    status
) => {

    const token =
        localStorage.getItem('token');

    const nuevoStatus =
        status === 'pendiente'
            ? 'completada'
            : 'pendiente';

    const response = await fetch(
        `${API_URL}/tasks/${id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify({
                status: nuevoStatus
            })
        }
    );

    return response.json();
};
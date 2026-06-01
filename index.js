const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.json());

const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado a SQLite de forma exitosa');
    }
});

// TABLA DE TAREAS
db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        status TEXT DEFAULT 'pendiente',
        priority TEXT DEFAULT 'media',
        createdAt TEXT
    )
`);

// TABLA DE USUARIOS
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
`);

// CORS
app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );

    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );

    res.setHeader('Content-Type', 'application/json');

    res.setHeader('Author', 'Bozo y Nina Penaloza');
    res.setHeader('API-Name', 'Todo List API Avanzada');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});


// REGISTRO


app.post('/register', (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({
            error: 'Usuario y contraseña obligatorios'
        });

    }

    db.run(
        'INSERT INTO users(username,password) VALUES (?,?)',
        [username, password],
        function(err) {

            if (err) {

                return res.status(400).json({
                    error: 'El usuario ya existe'
                });

            }

            res.status(201).json({
                message: 'Usuario registrado correctamente',
                userId: this.lastID
            });

        }
    );

});


// LOGIN


app.post('/login', (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({
            error: 'Usuario y contraseña obligatorios'
        });

    }

    db.get(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (err, row) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            if (!row) {

                return res.status(401).json({
                    error: 'Credenciales incorrectas'
                });

            }

            res.status(200).json({
                message: 'Login correcto',
                user: {
                    id: row.id,
                    username: row.username
                }
            });

        }
    );

});



// GET TASKS


app.get('/tasks', (req, res) => {

    db.all(
        'SELECT * FROM tasks',
        [],
        (err, rows) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            res.status(200).json(rows);

        }
    );

});



// POST 


app.post('/tasks', (req, res) => {

    const { title, status, priority } = req.body;

    if (!title) {

        return res.status(400).json({
            error: 'El título es obligatorio'
        });

    }

    const createdAt = new Date().toISOString();

    const finalStatus = status || 'pendiente';
    const finalPriority = priority || 'media';

    db.run(
        `INSERT INTO tasks
        (title,status,priority,createdAt)
        VALUES (?,?,?,?)`,
        [
            title,
            finalStatus,
            finalPriority,
            createdAt
        ],
        function(err) {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            res.status(201).json({
                id: this.lastID,
                title,
                status: finalStatus,
                priority: finalPriority,
                createdAt
            });

        }
    );

});



// PUT 


app.put('/tasks/:id', (req, res) => {

    const { id } = req.params;

    const { title, status, priority } = req.body;

    if (!title || !status || !priority) {

        return res.status(400).json({
            error: 'Debes enviar title, status y priority'
        });

    }

    db.run(
        'UPDATE tasks SET title=?, status=?, priority=? WHERE id=?',
        [title, status, priority, id],
        function(err) {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            if (this.changes === 0) {

                return res.status(404).json({
                    error: 'Tarea no encontrada'
                });

            }

            res.status(200).json({
                message: 'Tarea actualizada'
            });

        }
    );

});



// PATCH TASK


app.patch('/tasks/:id', (req, res) => {

    const { id } = req.params;

    const { title, status, priority } = req.body;

    db.get(
        'SELECT * FROM tasks WHERE id=?',
        [id],
        (err, row) => {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            if (!row) {

                return res.status(404).json({
                    error: 'Tarea no encontrada'
                });

            }

            const nuevoTitle =
                title !== undefined
                    ? title
                    : row.title;

            const nuevoStatus =
                status !== undefined
                    ? status
                    : row.status;

            const nuevoPriority =
                priority !== undefined
                    ? priority
                    : row.priority;

            db.run(
                'UPDATE tasks SET title=?, status=?, priority=? WHERE id=?',
                [
                    nuevoTitle,
                    nuevoStatus,
                    nuevoPriority,
                    id
                ],
                function(updateErr) {

                    if (updateErr) {

                        return res.status(500).json({
                            error: updateErr.message
                        });

                    }

                    res.status(200).json({
                        message: 'PATCH correcto'
                    });

                }
            );

        }
    );

});



// DELETE 


app.delete('/tasks/:id', (req, res) => {

    const { id } = req.params;

    db.run(
        'DELETE FROM tasks WHERE id=?',
        [id],
        function(err) {

            if (err) {

                return res.status(500).json({
                    error: err.message
                });

            }

            if (this.changes === 0) {

                return res.status(404).json({
                    error: 'Tarea no encontrada'
                });

            }

            res.status(200).json({
                message: 'Tarea eliminada'
            });

        }
    );

});


// START SERVER


app.listen(PORT, () => {

    console.log(
        `Servidor corriendo en http://localhost:${PORT}`
    );

});

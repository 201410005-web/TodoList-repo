//aumnentar metadatos y manejar elhttp header
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.json());


const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado a SQLite');
    }
});


db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
    )
`);

// GET 
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            return res.status(500).json(err.message);
        }

        res.json(rows);
    });
});

// POST 
app.post('/tasks', (req, res) => {
    const { title } = req.body;

    db.run(
        'INSERT INTO tasks(title) VALUES(?)',
        [title],
        function(err) {
            if (err) {
                return res.status(500).json(err.message);
            }

            res.json({
                id: this.lastID,
                title
            });
        }
    );
});

// PUT
app.put('/tasks/:id', (req, res) => {
    const { title } = req.body;
    const { id } = req.params;

    db.run(
        'UPDATE tasks SET title = ? WHERE id = ?',
        [title, id],
        function(err) {
            if (err) {
                return res.status(500).json(err.message);
            }

            res.json({
                message: 'Tarea actualizada'
            });
        }
    );
});

// DELETE 
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    db.run(
        'DELETE FROM tasks WHERE id = ?',
        [id],
        function(err) {
            if (err) {
                return res.status(500).json(err.message);
            }

            res.json({
                message: 'Tarea eliminada'
            });
        }
    );
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
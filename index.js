const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(express.json());

// Crear la base de datos en un archivo  llamado todo.db
const db = new sqlite3.Database('./todo.db', (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        console.log('Conectado exitosamente a la base de datos SQLite (todo.db)');
    }
});

// Inicializar la tabla de tareas y registros iniciales
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            completed INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

});

// ==========================================
//            CRUD
// ==========================================

//GET: Ver todas las tareas
app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST:  Crear una nueva tarea
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'El título es obligatorio' });

    const query = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
    db.run(query, [title, description], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        res.status(201).json({
            id: this.lastID,
            title,
            description,
            completed: 0
        });
    });
});

// PUT:id - Actualizar una tarea existente
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const query = 'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?';
    db.run(query, [title, description, completed, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Tarea no encontrada' });

        res.json({ message: 'Tarea actualizada correctamente', id, title, description, completed });
    });
});

// DELETE:id - Eliminar una tarea
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM tasks WHERE id = ?';
    db.run(query, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: 'Tarea no encontrada' });

        res.json({ message: `Tarea con ID ${id} eliminada con éxito` });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor de la API TO DO LIST corriendo en http://localhost:${PORT}`);
});


// GET: Obtener estadísticas de las tareas
app.get('/tasks/stats', (req, res) => {
    const query = `
        SELECT
            COUNT(*) as total,
            SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completadas,
            SUM(CASE WHEN completed = 0 THEN 1 ELSE 0 END) as pendientes
        FROM tasks
    `;
    db.get(query, [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
            total_tareas: row.total || 0,
            completadas: row.completadas || 0,
            pendientes: row.pendientes || 0
        });
    });
});

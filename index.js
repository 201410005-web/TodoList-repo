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

db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        status TEXT DEFAULT 'pendiente',
        priority TEXT DEFAULT 'media',
        createdAt TEXT
    )
`);

// Manejo de cabezeras
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Author', 'Bozo y Nina Penaloza');
    res.setHeader('API-Name', 'Todo List API Avanzada');

    next();
});


// Lista todas las tareas
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            // Estado 500-> Error interno del servidor
            return res.status(500).json({ error: err.message });
        }
        // Estado 200-> Éxito
        res.json(rows);
    });
});

// POST->Crea una tarea con metadatos iniciales
app.post('/tasks', (req, res) => {
    const { title, status, priority } = req.body;

    if (!title) {
        // Estado 400-> Petición incorrecta, faltan datos obligatorios
        return res.status(400).json({ error: 'El título de la tarea es obligatorio' });
    }

    const createdAt = new Date().toISOString();
    const finalStatus = status || 'pendiente';
    const finalPriority = priority || 'media';

    db.run(
        'INSERT INTO tasks (title, status, priority, createdAt) VALUES (?, ?, ?, ?)',
        [title, finalStatus, finalPriority, createdAt],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Estado 201-> Creado con éxito
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

// PUT->Actualiza totalmente la tarea
app.put('/tasks/:id', (req, res) => {
    const { title, status, priority } = req.body;
    const { id } = req.params;

    if (!title || !status || !priority) {
        return res.status(400).json({ error: 'Para usar PUT debes enviar title, status y priority obligatoriamente' });
    }

    db.run(
        'UPDATE tasks SET title = ?, status = ?, priority = ? WHERE id = ?',
        [title, status, priority, id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                // Estado 404-> Recurso no encontrado
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }

            // Estado 200-> Éxito en la actualización
            res.status(200).json({ message: 'Tarea actualizada por completo con PUT' });
        }
    );
});

// PATCH->Actualiza datos parcialmente
app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, status, priority } = req.body;

    // Verifica primero si la tarea existe antes de ejecutar la consulta
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            //Status 404-> si el ID no existe en la BD
            return res.status(404).json({ error: `No se pudo actualizar: Tarea con ID ${id} no encontrada` });
        }

        // Si existe, tomamos los valores nuevos que envió el cliente. Si el cliente no envio alguno, mantenemos el valor actual que ya está guardado en la BD.
        const nuevoTitle = title !== undefined ? title : row.title;
        const nuevoStatus = status !== undefined ? status : row.status;
        const nuevoPriority = priority !== undefined ? priority : row.priority;

        // Ejecutamos la actualización con los valores finales resueltos
        db.run(
            'UPDATE tasks SET title = ?, status = ?, priority = ? WHERE id = ?',
            [nuevoTitle, nuevoStatus, nuevoPriority, id],
            function(updateErr) {
                if (updateErr) {
                    return res.status(500).json({ error: updateErr.message });
                }
                
                //Status 200->  OK enviando el recurso modificado con sus nuevos metadatos
                res.status(200).json({
                    message: 'Actualización parcial con PATCH realizada con éxito',
                    taskUpdated: {
                        id: row.id,
                        title: nuevoTitle,
                        status: nuevoStatus,
                        priority: nuevoPriority,
                        createdAt: row.createdAt
                    }
                });
            }
        );
    });
});

// DELETE-> Eliminar una tarea por ID
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    db.run(
        'DELETE FROM tasks WHERE id = ?',
        [id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Tarea no encontrada' });
            }

            res.status(200).json({ message: 'Tarea eliminada' });
        }
    );
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

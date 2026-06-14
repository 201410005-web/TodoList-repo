const db = require('../database/db');

const getTasks = (req, res) => {

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

};

const createTask = (req, res) => {

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

};

const updateTask = (req, res) => {

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

};

const patchTask = (req, res) => {

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

};

const deleteTask = (req, res) => {

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

};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    patchTask,
    deleteTask
};
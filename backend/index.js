const express = require('express');
const https = require('https');
const fs = require('fs');

const passport = require('./config/passport');
const db = require('./database/db');

const corsMiddleware = require('./middlewares/corsMiddleware');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

const PORT = 3000;

// Middlewares

app.use(express.json());

app.use(passport.initialize());

app.use(corsMiddleware);

// Crear tablas

db.run(`
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'pendiente',
    priority TEXT DEFAULT 'media',
    createdAt TEXT
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
`);

// Rutas

app.use('/', authRoutes);

app.use('/tasks', taskRoutes);

// HTTPS

const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};

https.createServer(
    options,
    app
).listen(PORT, () => {

    console.log(
        `Servidor HTTPS corriendo en https://localhost:${PORT}`
    );

});
const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator');

require('dotenv').config();

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err);
        return;
    }
    console.log('Conectado a MySQL correctamente 🔥');
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API funcionando correctamente 🚀");
});

// CREATE
app.post(
    '/usuarios',
    [
        body('nombre')
            .notEmpty().withMessage('El nombre es obligatorio')
            .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

        body('edad')
            .isInt({ min: 0 }).withMessage('La edad debe ser un número entero positivo')
    ],
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const { nombre, edad } = req.body;

        const sql = 'INSERT INTO usuarios (nombre, edad) VALUES (?, ?)';

        connection.query(sql, [nombre, edad], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error al insertar usuario" });
            }

            res.status(201).json({
                id: result.insertId,
                nombre,
                edad
            });
        });
    }
);

// READ
app.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al obtener usuarios" });
        }

        res.json(results);
    });
});

// UPDATE
app.put('/usuarios/:id', (req, res) => {
    const { nombre, edad } = req.body;
    const { id } = req.params;

    const sql = 'UPDATE usuarios SET nombre = ?, edad = ? WHERE id = ?';

    connection.query(sql, [nombre, edad, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al actualizar usuario" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario actualizado correctamente" });
    });
});

// DELETE  
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM usuarios WHERE id = ?';

    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al eliminar usuario" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.json({ mensaje: "Usuario eliminado correctamente" });
    });
});

app.listen(process.env.PORT, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
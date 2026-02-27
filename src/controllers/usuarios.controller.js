const connection = require('../config/db');
const { validationResult } = require('express-validator');

exports.crearUsuario = (req, res) => {
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
};

exports.obtenerUsuarios = (req, res) => {
    const sql = 'SELECT * FROM usuarios';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al obtener usuarios" });
        }

        res.json(results);
    });
};

exports.actualizarUsuario = (req, res) => {
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
};

exports.eliminarUsuario = (req, res) => {
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
};
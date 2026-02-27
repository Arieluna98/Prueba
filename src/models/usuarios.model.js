const connection = require('../config/db');

// CREATE
exports.crear = (nombre, edad, userId, callback) => {
    const sql = 'INSERT INTO usuarios (nombre, edad, user_id) VALUES (?, ?, ?)';
    connection.query(sql, [nombre, edad, userId], callback);
};

// READ
exports.obtenerTodos = (callback) => {
    const sql = 'SELECT * FROM usuarios';
    connection.query(sql, callback);
};

// UPDATE
exports.actualizar = (id, nombre, edad, callback) => {
    const sql = 'UPDATE usuarios SET nombre = ?, edad = ? WHERE id = ?';
    connection.query(sql, [nombre, edad, id], callback);
};

// DELETE
exports.eliminar = (id, callback) => {
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    connection.query(sql, [id], callback);
};
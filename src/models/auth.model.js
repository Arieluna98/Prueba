const connection = require('../config/db');

// buscar usuario por email
exports.buscarPorEmail = (email, callback) => {
    const sql = 'SELECT * FROM usuarios_auth WHERE email = ?';
    connection.query(sql, [email], callback);
};

// crear usuario
exports.crearUsuario = (email, password, callback) => {
    const sql = 'INSERT INTO usuarios_auth (email, password) VALUES (?, ?)';
    connection.query(sql, [email, password], callback);
};
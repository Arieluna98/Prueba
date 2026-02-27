const connection = require('../config/db');
const { validationResult } = require('express-validator');
const usuariosModel = require('../models/usuarios.model');
const { success } = require('../helpers/response.helper');

exports.crearUsuario = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Datos inválidos");
        error.status = 400;
        return next(error);
    }

    const { nombre, edad } = req.body;

    // 🔥 usuario autenticado desde JWT
    const userId = req.user.id;

    usuariosModel.crear(nombre, edad, userId, (err, result) => {
        if (err) return next(err);

        success(res, {
            id: result.insertId,
            nombre,
            edad
        }, 201);
    });
};

exports.obtenerUsuarios = (req, res) => {
    console.log("Usuario autenticado:", req.user);
    usuariosModel.obtenerTodos((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al obtener usuarios" });
        }

        success(res, results);
    });
};

exports.actualizarUsuario = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    const { nombre, edad } = req.body;
    const { id } = req.params;

    usuariosModel.actualizar(id, nombre, edad, (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al actualizar usuario" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        success(res, { mensaje: "Usuario actualizado correctamente" });
    });
};

exports.eliminarUsuario = (req, res, next) => {
    const { id } = req.params;

    usuariosModel.eliminar(id, (err, result) => {

        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al eliminar usuario" });
        }

        if (result.affectedRows === 0) {
            const error = new Error("Usuario no encontrado");
             error.status = 404;
             return next(error);
        }

        success(res, { mensaje: "Usuario eliminado correctamente" });
    });
};
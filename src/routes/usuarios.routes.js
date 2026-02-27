const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const usuariosController = require('../controllers/usuarios.controller');

// CREATE
router.post(
    '/',
    [
        body('nombre')
            .notEmpty().withMessage('El nombre es obligatorio')
            .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

        body('edad')
            .isInt({ min: 0 }).withMessage('La edad debe ser un número entero positivo')
    ],
    usuariosController.crearUsuario
);

// READ
router.get('/', usuariosController.obtenerUsuarios);

// UPDATE
router.put(
    '/:id',
    [
        body('nombre')
            .notEmpty().withMessage('El nombre es obligatorio')
            .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

        body('edad')
            .isInt({ min: 0 }).withMessage('La edad debe ser un número entero positivo')
    ],
    usuariosController.actualizarUsuario
);

// DELETE
router.delete('/:id', usuariosController.eliminarUsuario);

module.exports = router;
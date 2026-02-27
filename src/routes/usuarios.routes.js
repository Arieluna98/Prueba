const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');
const usuariosController = require('../controllers/usuarios.controller');

// CREATE
router.post(
    '/',
    authMiddleware,
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
router.get('/', authMiddleware, usuariosController.obtenerUsuarios);

// UPDATE
router.put(
    '/:id',
    authMiddleware,
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
router.delete('/:id', authMiddleware, usuariosController.eliminarUsuario);

module.exports = router;
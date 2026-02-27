const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authModel = require('../models/auth.model');
const { success } = require('../helpers/response.helper');

// REGISTER
exports.register = (req, res, next) => {

    const { email, password } = req.body;

    authModel.buscarPorEmail(email, async (err, results) => {
        if (err) return next(err);

        if (results.length > 0) {
            const error = new Error('El usuario ya existe');
            error.status = 400;
            return next(error);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        authModel.crearUsuario(email, hashedPassword, (err, result) => {
            if (err) return next(err);

            success(res, {
                message: 'Usuario registrado correctamente'
            }, 201);
        });
    });
};

// LOGIN
exports.login = (req, res, next) => {

    const { email, password } = req.body;

    authModel.buscarPorEmail(email, async (err, results) => {
        if (err) return next(err);

        if (results.length === 0) {
            const error = new Error('Credenciales inválidas');
            error.status = 401;
            return next(error);
        }

        const usuario = results[0];

        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) {
            const error = new Error('Credenciales inválidas');
            error.status = 401;
            return next(error);
        }

        // 🔥 generar token
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        success(res, { token });
    });
};
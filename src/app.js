const express = require('express');
const errorHandler = require('./middleware/error.middleware');

const app = express();

app.use(express.json());

// ✅ rutas 
const usuariosRoutes = require('./routes/usuarios.routes');
app.use('/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
    res.send("API funcionando correctamente 🚀");
});

// ✅ middleware de errores 
app.use(errorHandler);

module.exports = app;
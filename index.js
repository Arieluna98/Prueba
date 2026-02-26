const express = require('express');
const app = express();

app.use(express.json());

let usuarios = [];
let id = 1;

app.get('/', (req, res) => {
    res.send("API funcionando correctamente 🚀");
});

// CREATE
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = { id: id++, ...req.body };
    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// READ
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// UPDATE
app.put('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id == req.params.id);

    if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    Object.assign(usuario, req.body);

    res.json(usuario);
});

// DELETE
app.delete('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id == req.params.id);

    if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    usuarios = usuarios.filter(u => u.id != req.params.id);

    res.json({ mensaje: "Usuario eliminado correctamente" });
});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
const express = require('express');
const router = express.Router();

let mensajes = [];

router.get('/contacto', (req, res, next) => {
    res.render('contacto', { exito: false });
});

router.post('/contacto', (req, res, next) => {
    const { nombre, email, mensaje } = req.body;
    mensajes.push({ nombre, email, mensaje });
    res.render('contacto', { exito: true });
});

router.get('/mensajes', (req, res, next) => {
    res.render('mensajes', { mensajes: mensajes });
});

module.exports = router;

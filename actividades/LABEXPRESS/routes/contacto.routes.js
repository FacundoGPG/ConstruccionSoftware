const express = require('express');
const path    = require('path');
const fs      = require('fs');
const router  = express.Router();

// Ruta 4 GET: mostrar formulario de contacto
router.get('/', (request, response, next) => {
    response.setHeader('Content-Type', 'text/html');
    const html = fs.readFileSync(path.resolve(__dirname, './../views/contacto.html'), 'utf8');
    response.write(html);
    response.end();
});

// Ruta 5 POST: recibir y guardar datos del formulario en archivo de texto
router.post('/', (request, response, next) => {
    const nombre  = request.body.nombre;
    const email   = request.body.email;
    const mensaje = request.body.mensaje;

    const contenido = `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}\n---\n`;
    fs.appendFileSync(path.resolve(__dirname, './../mensajes.txt'), contenido, 'utf8');

    response.setHeader('Content-Type', 'text/plain');
    response.send('Mensaje guardado correctamente. Puedes regresar con el botón atrás.');
    response.end();
});

module.exports = router;

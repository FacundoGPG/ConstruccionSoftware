const express = require('express');
const path    = require('path');
const fs      = require('fs');
const router  = express.Router();

// Ruta 1: Inicio
router.get('/', (request, response, next) => {
    response.setHeader('Content-Type', 'text/html');
    const html = fs.readFileSync(path.resolve(__dirname, './../views/index.html'), 'utf8');
    response.write(html);
    response.end();
});

// Ruta 2: Features
router.get('/features', (request, response, next) => {
    response.setHeader('Content-Type', 'text/html');
    const html = fs.readFileSync(path.resolve(__dirname, './../views/features.html'), 'utf8');
    response.write(html);
    response.end();
});

// Ruta 3: Reflexión
router.get('/reflexion', (request, response, next) => {
    response.setHeader('Content-Type', 'text/html');
    const html = fs.readFileSync(path.resolve(__dirname, './../views/reflexion.html'), 'utf8');
    response.write(html);
    response.end();
});

module.exports = router;

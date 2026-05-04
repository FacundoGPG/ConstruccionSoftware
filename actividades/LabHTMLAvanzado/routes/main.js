const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/acerca', (req, res, next) => {
    res.render('acerca');
});

router.get('/info', (req, res, next) => {
    res.render('info', {
        nodeVersion: process.version,
        fecha: new Date().toLocaleDateString('es-MX')
    });
});

module.exports = router;

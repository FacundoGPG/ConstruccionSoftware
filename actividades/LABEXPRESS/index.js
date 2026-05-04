const express    = require('express');
const path       = require('path');
const fs         = require('fs');
const app        = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Archivos estáticos (CSS)
app.use(express.static(path.join(__dirname)));

// Módulo 1: rutas principales
const rutasPrincipales = require('./routes/principales.routes');
app.use('/', rutasPrincipales);

// Módulo 2: rutas de contacto
const rutasContacto = require('./routes/contacto.routes');
app.use('/contacto', rutasContacto);

// 404
app.use((request, response, next) => {
    response.status(404);
    response.send('404 - Página no encontrada');
});

app.listen(3000);

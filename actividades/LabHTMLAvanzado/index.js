const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const mainRouter = require('./routes/main');
const contactoRouter = require('./routes/contacto');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", "views");

app.use('/', mainRouter);
app.use('/', contactoRouter);

// Manejo de 404
app.use((req, res, next) => {
    res.status(404).render('404', { url: req.originalUrl });
});

app.listen(3000);

const cookieParser = require('cookie-parser');
const express = require('express');
const path    = require('path');
const app     = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cookieParser());
app.use(session( {
    secret: 'mi string secreto debe ser un string aleatorio muy largo',
    resave: false,
    saveUninitialized: true,
}));


app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.cookie("mi_cookie", "123", { httpOnly: true });
    response.type('text/plain');
    response.send('Hola Mundo');
});

app.get("/test_cookie", (req, res) => {
    const valor = req.cookies.mi_cookie;
    res.type('text/plain');
    res.send(valor || "No hay cookie llamada mi_cookie")
});

app.get("/test_session", (req, res) => {
    req.session.mi_variable = "valor";
    res.type('text/plain');
    res.send(req.session.mi_variable);
});

app.get("/test_session_variable", (req, res) => {
    const valor = req.session.mi_variable;
    res.type('text/plain');
    res.send(valor || "No hay variable de sesión llamda mi_variable")
});

app.get("/logout", (req, res) => {
    req.session.destroy(() =>{
        res.redirect("/");
    });
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
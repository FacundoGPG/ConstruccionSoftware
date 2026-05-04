const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const session      = require('express-session');
const cors         = require('cors');
const helmet       = require('helmet');
const { doubleCsrf } = require('csrf-csrf');
const app          = express();

const {
    generateCsrfToken,
    doubleCsrfProtection,
} = doubleCsrf({
    getSecret:            () => process.env.CSRF_SECRET || 'cambia-esto-en-desarrollo',
    getSessionIdentifier: (req) => req.session.id,
    cookieName:           'x-csrf-token',
    cookieOptions:        { httpOnly: true, sameSite: 'lax', secure: false },
    // Por default csrf-csrf v4 solo busca el token en el header x-csrf-token.
    // Como nuestro <form> lo envía en el body como input hidden, le decimos
    // explícitamente que también revise req.body.
    getCsrfTokenFromRequest: (req) => req.body['x-csrf-token'] || req.headers['x-csrf-token']
});

app.set('view engine', 'ejs');
app.set('views', 'views');

// Orden de middlewares: Helmet primero (aplica headers a TODO),
// luego CORS, luego parsers, luego sesión, luego rutas.
app.use(helmet());
app.use(cors({
    origin: [
        'https://miapp.com',
        'https://www.miapp.com',
        'http://localhost:3000',
        'https://cdn.jsdelivr.net'
    ],
    credentials: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste',
    resave: false,
    saveUninitialized: true, // necesario para csrf-csrf: el token se firma con el session ID
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false // pon true cuando despliegues a HTTPS
    }
}));

// Orden importante:
// 1. PRIMERO validar el token del request entrante (POST/PUT/DELETE).
app.use(doubleCsrfProtection);

// 2. DESPUÉS generar un token nuevo para la siguiente vista.
//    Si invirtieras el orden, regenerarías el token antes de validarlo
//    y la validación pasaría siempre — anulando la protección.
app.use((req, res, next) => {
    res.locals.csrfToken = generateCsrfToken(req, res);
    next();
});


// --- Rutas ---

app.get('/', (req, res) => {
    res.cookie('mi_cookie', '123', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    });
    res.type('text/plain');
    res.send('Hola Mundo');
});

app.get('/test_cookie', (req, res) => {
    const valor = req.cookies.mi_cookie;
    res.type('text/plain');
    res.send(valor || 'No hay cookie llamada mi_cookie');
});

app.get('/test_session', (req, res) => {
    req.session.mi_variable = 'valor';
    res.type('text/plain');
    res.send(req.session.mi_variable);
});

app.get('/test_session_variable', (req, res) => {
    const valor = req.session.mi_variable;
    res.type('text/plain');
    res.send(valor || 'No hay variable de sesión definida. Visita /test_session primero.');
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Mini ejercicio XSS: usar <%= %> escapa el input (seguro)
// Si cambias a <%- %> en la vista, el script se ejecutaría (inseguro)
app.get('/buscar', (req, res) => {
    res.render('buscar', { q: req.query.q || '' });
});

// Formulario con protección CSRF
app.get('/formulario', (req, res) => {
    res.render('formulario');
});

app.post('/formulario', (req, res) => {
    const dato = req.body.dato || '';
    res.type('text/plain');
    res.send('Dato recibido correctamente: ' + dato);
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});

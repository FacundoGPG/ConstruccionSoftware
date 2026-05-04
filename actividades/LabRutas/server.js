const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    const url = req.url.split('?')[0].replace(/\/$/, '');

    if (req.method === 'GET' && (url === '' || url === '/')) {
        fs.readFile(path.join(__dirname, 'lab1.html'), (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }

    else if (req.method === 'GET' && url === '/sobremi') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Sobre mí</h1>');
        res.write('<p><strong>Nombre:</strong> Facundo Gael Piñeiro González</p>');
        res.write('<p><strong>Matrícula:</strong> A01666626</p>');
        res.write('<p><strong>Correo:</strong> A01666626@tec.mx</p>');
        res.write('<p>Estudiante de ITC en el Tec de Monterrey campus Querétaro.</p>');
        res.write('<a href="/">Volver</a>');
        res.end();
    }

    else if (req.method === 'GET' && req.url === '/hobbies') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Hobbies</h1>');
        res.write('<ul>');
        res.write('<li>Programar</li>');
        res.write('<li>Natación</li>');
        res.write('<li>Leer</li>');
        res.write('<li>Jugar videojuegos</li>');
        res.write('</ul>');
        res.write('<a href="/">Volver</a>');
        res.end();
    }

    else if (req.method === 'GET' && req.url === '/aficiones') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Aficiones</h1>');
        res.write('<p>Me interesa desarrollar creatividad en animación, escritura y video.</p>');
        res.write('<p>Artista favorito: <a href="https://es.wikipedia.org/wiki/Guillermo_del_Toro" target="_blank">Guillermo del Toro</a></p>');
        res.write('<a href="/">Volver</a>');
        res.end();
    }

    else if (req.method === 'GET' && req.url === '/preguntas') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Preguntas</h1>');
        res.write('<p><strong>GET:</strong> Obtener datos</p>');
        res.write('<p><strong>POST:</strong> Enviar datos</p>');
        res.write('<p><strong>404:</strong> Recurso no encontrado</p>');
        res.write('<p><strong>500:</strong> Error del servidor</p>');
        res.write('<a href="/">Volver</a>');
        res.end();
    }

    else if (req.method === 'GET' && req.url === '/contacto') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<h1>Contacto</h1>');
        res.write('<form action="/guardar" method="POST">');
        res.write('<input type="text" name="nombre" placeholder="Nombre"><br>');
        res.write('<input type="text" name="correo" placeholder="Correo"><br>');
        res.write('<button type="submit">Enviar</button>');
        res.write('</form>');
        res.write('<a href="/">Volver</a>');
        res.end();
    }

    else if (req.method === 'POST' && req.url === '/guardar') {
        let datos = '';

        req.on('data', chunk => {
            datos += chunk.toString();
        });

        req.on('end', () => {
            fs.appendFile('datos.txt', datos + '\n', () => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h1>Datos guardados</h1>');
                res.write('<a href="/">Volver</a>');
                res.end();
            });
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>404 - No encontrado</h1>');
        res.write('<a href="/">Inicio</a>');
        res.end();
    }

});

server.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
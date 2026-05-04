const http = require('http');
const fs = require('fs');
const path = require('path');

// Ejercicios

// 1.  PROMEDIO

function promedio(arr) {
    if (arr.length === 0) return 0;
    let suma = arr.reduce((a, b) => a + b, 0);
    return suma / arr.length;
}

console.log("Promedio:", promedio([10, 20, 30, 40]));

// 2.  ESCRIBIR ARCHIVO

function escribirArchivo(texto) {
    fs.writeFileSync('archivo.txt', texto);
    console.log("Archivo creado correctamente");
}

escribirArchivo("Hola desde Node.js");


// 3. Factorial

function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

console.log("Factorial de 5:", factorial(5));


const port = 3000;

const server = http.createServer((req, res) => {
    console.log("Petición recibida:", req.url);

    if (req.url === "/") {
        // Leer archivo HTML
        fs.readFile(path.join(__dirname, 'lab1.html'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error al cargar la página');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else {
        // Ruta no encontrada
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página no encontrada');
    }
});

server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});



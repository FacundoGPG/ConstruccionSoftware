const rutasFormulario = requires  ()

const express = require('express');
const router = express.Router();

app.get('/form_method', (request, response, next) => {
    response.setHeader('Content-Type', 'text/html');
    const html = fs.readFileSync(path.resolve(__dirname, './form.html'), 'utf8')
    response.write(html);
    response.end();  
});

app.post('/form_method', (request, response, next) => {
    const indice = Number(request.body.indice);
    const imprimir = request.body.imprimir;

    for(var i = 1; i <= indice; i++){
        console.log(imprimir)
    }
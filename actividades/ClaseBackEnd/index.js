let log = console.log;

log("Hola Mundo");

//fs es el módulo que contiene las funciones para
//manipular el sistema de archivos
const fs = require("fs");

//Crear un archivo con la clase writeFileSync
fs.writeFileSync("archivo.txt", "Hola Mundo");

//Async Sort
const arreglo = [5000, 60, 90, 100, 10, 20, 10000, 0, 120, 2000, 340, 1000, 50];



/*for (let item of arreglo) {
    setTimeout(() => {
        log(item);
    }, item);
}*/

log("Hola");

setTimeout(() => {
    log("Mundo");
}, 2000);

log("Adios");
/* const http = require("http")
import express from "express";
const app = express()

let puerto=3000
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hola Mundo!\n');
}).listen(puerto)

console.log(`Servidor en la url http://localhost:${puerto}/`)
 */

const express=require("express")
var app = express();

app.get('/', function(req, res) {
  res.send('Hola Mundo!');
});

app.listen(3000, function() {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!')
  console.log("http://localhost:3000/");;
})
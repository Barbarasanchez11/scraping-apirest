const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const fs = require('fs');
const app = express();

// Middleware para manejar datos JSON
app.use(express.json());
// Middleware para manejar datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

let noticias = []; // Inicializa la variable noticias

// Función para leer datos de un archivo
function leerDatos() {
    try {
        const data = fs.readFileSync('noticias.json');
        noticias = JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        noticias = []; // Si no se puede leer, inicializa como un arreglo vacío
    }
}

// Función para guardar datos en un archivo
function guardarDatos() {
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2), 'utf8');
}

app.get('/noticias', (req, res) => {
    leerDatos();
    res.json(noticias);
});

app.post('/noticias', (req, res) => {
    leerDatos();

    const nuevaNoticia = {
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        enlace: req.body.enlace,
    };

    noticias.push(nuevaNoticia);
    guardarDatos();
    console.log(nuevaNoticia);
    res.status(201).json(noticias);
});

app.delete('/noticias/:titulo', (req, res) => {
    leerDatos();
    
    const titulo = req.params.titulo;
    const nuevaLista = noticias.filter(noticia => noticia.titulo !== titulo);

    if (nuevaLista.length === noticias.length) {
        return res.status(404).json({ mensaje: 'Noticia no encontrada' });
    }

    noticias = nuevaLista;
    guardarDatos();
    res.json(noticias);
    console.log(`Noticia eliminada: ${titulo}`);
});

app.listen(3000, () => {
    console.log('Express está escuchando en el puerto http://localhost:3000');
});

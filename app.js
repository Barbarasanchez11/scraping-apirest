const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

// Middleware para manejar datos JSON
app.use(express.json());
// Middleware para manejar datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

// Leer datos desde el archivo JSON
function leerDatos() {
    try {
      const data = fs.readFileSync('noticias.json', 'utf-8');
      noticias = JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo noticias.json:', error.message);
    }
  }
  
  // Guardar datos en el archivo JSON
  function guardarDatos() {
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
  }



app.get('/', (req,res)=>{
    res.send('funciona')
})

app.listen(3000, () => {
    console.log('express esta escuchando en el puerto http://localhost:3000')
})
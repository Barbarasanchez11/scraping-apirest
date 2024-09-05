const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const fs = require('fs')

const url = 'https://elpais.com/ultimas-noticias/'

app.get("/", async (req, res) => {
    try {
      const response = await axios.get(url)
      const html = response.data
      const $ = cheerio.load(html)

      let noticias = [];
        $('.b-st_a article.c.c-d.c--m').each((index, element)=>{
            const title=$(element).find('h2').text();
            const img = $(element).find('img').attr('src');
            const parrafo=$(element).find('p').text();
            const link = $(element).find('a').attr('href');
        
            const noticia = {
                titulo: title,
                imagen: img,
                descripcion: parrafo,
                enlace: link,
            };
        noticias.push(noticia)
        })


fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2))

res.send(`
  <p>Noticas</p>
  <ul>
    ${noticias.map(noticia => `
      <li>
        <h2><a href="${noticia.enlace}">${noticia.titulo}</a></h2>
        <img src="${noticia.imagen}" alt="${noticia.titulo}" />
        <p>Descripción: ${noticia.descripcion}</p>
      </li>
    `).join('')}
  </ul>
`)

    } catch (error) {
        console.error(`el error es el ${error}`)
        res.status(500).send(`Error interno ${error}`)
      }
     })
     

app.listen(3001, () => {

    console.log('express esta escuchando en el puerto http://localhost:3001')

})
/*
async function scrapingLinks(link) {
    try {
      const response = await axios.get(`https://es.wikipedia.org${link}`)
      const html = response.data
      const $ = cheerio.load(html)
   
   
      const h2 = $("h2").text()
      const images = []
      $("img").each((i, elemento) => {
        const src = $(elemento).attr("src")
        images.push(src)
      })
      const texts = []
      $("p").each((i, elemento) => {
        const text = $(elemento).text()
        texts.push(text)
      })
     
      return {h2, images, texts}
   
   
    } catch (error) {
      console.error(`el error es el ${error}`)
      res.status(500).send(`Error interno ${error}`)
    }
}
*/


/*
function leerDatos() {
    try {
      const data = fs.readFileSync('noticias.json', 'utf-8');
      noticias = JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo noticias.json:', error.message);
    }
  }
  
  
  function guardarDatos() {
    fs.writeFileSync('noticias.json', JSON.stringify(noticias, null, 2));
  }*/
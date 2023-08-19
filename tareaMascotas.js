// -Crear un archivo JSON que contenga un array de Mascotas(cada mascota debe tener un ‘nombre’,  ‘animal’, ‘edad’, ‘perdido’)
// -Crear un endpoint POST /mascotas que agregue una mascota al json

const express = require('express');
const app = express();
const fs = require('fs/promises');

app.use(express.json());



app.get('/', (req, res) => {
  console.log("test")
  res.send("Hola mundo");
});


// -Crear un endpoint GET /mascotas que filtre por parametros (animal/perdido) y responda un json con las mascotas filtradas
// Endpoint GET /mascotas
app.get('/mascotas', async (req, res) => {
  const { animal, perdido } = req.query;
  const data=await fs.readFile('mascotas.json', 'utf-8');
  let mascotas=JSON.parse(data);

    if (animal) {
      mascotas = mascotas.filter(mascota => mascota.animal.toLowerCase() === animal.toLowerCase());
    }

    if (perdido) {
      mascotas = mascotas.filter(mascota => mascota.perdido === (perdido.toLowerCase() === 'true'));
    }

    // console.log(mascotas);
    res.json(mascotas);
  });



  // -Crear un endpoint GET /mascotas/:nombre que filtre por nombre de la mascota 
  //y devuelva un json con los datos de esa mascota

app.get('/mascotas/:nombre', async(req, res) => {
  const nombreMascota = req.params.nombre;
  const data= await fs.readFile('mascotas.json', 'utf-8')
  let mascotas= JSON.parse(data);
  let mascota=mascotas.find((mascota)=>mascota.nombre===nombreMascota);
    res.json(mascota);
});





// -Crear un endpoint POST /mascotas que agregue una mascota al json

app.post('/mascotas', async (req, res) => {

    const body = req.body; // req.body = {nombre: "nombre", animal: "animal", edad: "edad", perdido: "perdido"}
    const data = await fs.readFile("./mascotas.json", "utf-8"); // dentro de data se encuentra el array de mascotas pero en formato texto
    const mascotas = JSON.parse(data); // convertimos el texto a un array de objetos

    mascotas.push(body); // agregamos la mascota al array
    
    const error = await fs.writeFile("./mascotas.json", JSON.stringify(mascotas)); // convertimos el array de objetos a texto y lo guardamos en el archivo mascotas.json
    if (error) { res.json({ error: "No se pudo guardar la mascota" }) }
    res.json({ mensaje: "Se guardo la mascota correctamente" }); // respondemos con un mensaje
    
});

   
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});
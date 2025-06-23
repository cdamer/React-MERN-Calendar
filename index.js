const express = require('express');
const path = require('path');

//cargar variables de entorno
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// console.log( process.env )


// Create el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());


// Directorio público
app.use(express .static('public'));

// Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//para el error cuando no se encuentra una ruta
app.use(  (req, res) => { res.sendFile ( path.join( __dirname, 'public', 'index.html' )) });



// escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${ process.env.PORT }`);
});
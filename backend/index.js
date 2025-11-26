const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar conexión y modelo
const sequelize = require('./models/db');
const Product = require('./models/Product');

const app = express();

// Middlewares (Configuración básica)
app.use(cors());
app.use(express.json()); 

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Levantar servidor y sincronizar base de datos
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  
  try {
    await sequelize.sync({ force: false }); 
    console.log('Tablas sincronizadas con la base de datos');
  } catch (error) {
    console.error('Error al sincronizar base de datos:', error);
  }
});
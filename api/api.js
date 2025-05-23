const express = require('express');
const cors = require('cors');
const filesRoutes = require('./src/routes/filesRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/files', filesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

// Export para tests
module.exports = app;
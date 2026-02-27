require('dotenv').config();

const app = require('./src/app');
require('./src/config/db');

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
const express = require("express");
const cors = require("cors");

const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
        auth:         '/api/auth',  
        users:        '/api/users',
        cases:        '/api/cases',
        laboratories: '/api/laboratories',
    }

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  async conectarDB() {
    await dbConnection();
  }

  routes() {
      this.app.use( this.paths.auth, require('../routes/auth') );
      this.app.use( this.paths.cases, require('../routes/cases') );
      this.app.use( this.paths.users, require('../routes/users') );
      this.app.use( this.paths.laboratories, require('../routes/laboratories') );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;

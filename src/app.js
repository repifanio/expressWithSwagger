const express = require('express');
const routes = require('../routes/index');
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

class App {
  constructor() {
    this.server = express();
    this.routes();
    var swaggerDefinition = {
        info: {
          title: 'Node Swagger API',
          version: '1.0.0',
          description: 'Demonstrating how to describe a RESTful API with Swagger  -TEST',
        },
        host: 'localhost:3001',
        basePath: '/',
      };
    
      var options = {
        // import swaggerDefinitions
        swaggerDefinition,
        // path to the API docs
        apis: ['./routes/*.js'],
      };

      var swaggerSpec = swaggerJSDoc(options);
      
      routes.get('/swagger.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
      });


 
      this.server.use(express.static(path.join(__dirname, 'public')));

    
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
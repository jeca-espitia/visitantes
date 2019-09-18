var express = require('express');
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

// definimos el schema
var schema = mongoose.Schema({
    nombre: String,
    date: { type: Date, default: Date.now() },
   //ObjectId: ,
    published: { type: Boolean, default: false }
  });
  
  // definimos el modelo
var visitantes = mongoose.model("visitantes", schema);
var app = express();

app.get('/', (req, res) => {
	  if (!req.query.nombre){
        visitantes.create({ nombre: "anomimo"}, function(err) {   
            res.send("<h1>Hola desconocido!</h1>");    
            });
        
	  }else{
            visitantes.create({ nombre: req.query.nombre}, function(err) { 
                res.send("<h1>El visitante fue almacenado con éxito</h1>");
        });
	  } 
	}); 
    app.listen(3000, () => console.log('Listening on port 3000!'));
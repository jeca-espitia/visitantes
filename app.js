var express = require('express');
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

// definimos el schema
var schema = mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now() }
  });
  
  // definimos el modelo
var visitantes = mongoose.model("visitantes", schema);
var app = express();

app.get('/', (req, res) => {
	  if (!req.query.name){
        visitantes.create({ name: "Anómimo"}, function(err) {   
          res.send("<h1>El visitante fue almacenado con éxito</h1>");
            });
        
	  }else{
            visitantes.create({ name: req.query.name}, function(err) { 
                res.send("<h1>El visitante fue almacenado con éxito</h1>");
        });
	  } 
	}); 
    app.listen(3000, () => console.log('Listening on port 3000!'));
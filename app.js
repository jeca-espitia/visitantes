var express = require('express');
var mongoose = require("mongoose");
var app = express();


// definimos el schema
var schema = mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now(),
      published: { type: Boolean, default: false } }
  });
  
  // definimos el modelo
var Visitor = mongoose.model("Visitor", schema);

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function(e) { console.error(e); });

app.get('/', (req, res) => {
	  if (!req.query.name){
      Visitor.create({ name: "Anónimo"}, function(err) {   
          res.send("<h1>El visitante fue almacenado con éxito</h1>");
            });
        
	  }else{
               Visitor.create({ name: req.query.name}, function(err) { 
                res.send("<h1>El visitante fue almacenado con éxito</h1>");
        });
	  } 
	}); 
app.listen(3000, () => console.log('Listening on port 3000!'));
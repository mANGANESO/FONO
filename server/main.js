const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');


const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*app.use("/",express.static('public'));*/
app.use(express.static(path.join(__dirname,'public')));

/*var mongo_uri ='mongodb:// /'; Conectar a la base de datos mongodb

mongoose.connect(mongo_uri, function(err){
  if (err) {
    throw err;
  }else{
  	console.log(`successfully connected to ${mongo_uri}`);
  }
})*/

app.post('register', function(req,res){
 const {username, password} = req.body;

 const user = new User({username, password});
 user.save( function(err){
 	if (err) {
 		res.status(500).send('ERROR AL REGISTRAR USUARIO');
 	}else{
 		res.status(200).send('USUARIO REGISTRADO');
 	}

 });

});

app.post('/authenticate', function(req, res){
 const {username, password} = req.body;

 User.findOne({username}, function(err, user){
   if(err){
   	res.status(500).send('ERROR AL AUTENTICAR USUARIO');

   }else if(!user){
    res.status(500).send('EL USUARIO NO EXISTE');
   }else{
   	 user.isCorrectPassword(password, function(err, result) {
   	 	if(err) {
   	 		res.status(500).send('ERROR AL AUTENTICAR USUARIO');
   	 	}else if(result){
          res.status(200).send('USUARIO REGISTRADO');
   	 	}else{
   	 		res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA');
   	 	}

   	 });
   }
 });
  
});

server.listen(5001, function(){
	console.log("Servidor corriendo en http://localhost:5001");
	()
});
// Importación de Express y Cors
const cors = require('cors');
const express = require('express');

// Se crea una Express App con Cors habilitado
const app = express();
app.use(cors());
app.options('*', cors());

// Definición del pierto
const port = 8105;

// Define root controller (GET)
app.get('/' , (req, res, next) => {
	res.send('Bienvenidos a mi API, by Jorge Tato...');
});


app.get('/resultado', (req, res, next) => {
	var Solucion = req.query.Solucion;
	

	var Resultado = eval(Solucion);
	var objResult = {
		Resultado: Resultado
	}
	res.send(objResult);
});

app.get('/raizCuadrada', (req, res, next) => {
	var Num = req.query.Num;

	var Resultado = Math.sqrt(Num);
	var objResult = {
		Resultado: Resultado
	}
	res.send(objResult);
});

app.listen(port, () => 
	console.log('Escuchando en el puerto ' + port)
);
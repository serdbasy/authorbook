/**
 * Created by serdarbasyigit on 19/08/15.
 */
var mysql      = require('mysql'),
	express = require('express'),
	bodyParser = require("body-parser"),
	app = express(),
	Sequelize = require('sequelize'),
	book = require('./models/book.js'),
	author = require('./models/author.js');

app.use(bodyParser.json());
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	if ('OPTIONS' == req.method){
		return res.send(200);
	}
	next();
});

var crossOrigin = {
	'X-Requested-With': "XMLHttpRequest",
	'Accept':'application/json, text/javascript',
	'Content-Type': 'application/json; charset=utf-8',
	'Access-Control-Max-Age' : '1728000',
	'Access-Control-Allow-Origin': '*'
};

var sequelize = new Sequelize('authorbook', 'root', '123456', {
	host: 'localhost',
	// dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',
});

var Book = book(sequelize, Sequelize),
	Author = author(sequelize, Sequelize);

Book.hasOne(Author, {foreignKey: { name:'id', allowNull: false}, as: 'Author'});



app.get('/', function(req, res){
	res.send("Merhaba Dünyalı");
});

// yazarlar
app.get('/author', function(req, res){
	res.set("Content-Type","application/json;charset=UTF-8");
	res.set("Access-Control-Allow-Origin","*");

	Author.findAll({order: 'name ASC, surname ASC'}).then(function(author) {
		if(author){
			res.status(200).send(author);
		}
		else{
			res.status(200).send({});
		}
	});
});
app.post('/author/create', function(req, res){
	res.set("Content-Type","application/json;charset=UTF-8");

	var body = req.body || {};
	console.log(body);
	console.log(req);
	if(body.name && body.name != '' && body.surname && body.surname != ''){
		Author.create({
			name:body.name,
			surname:body.surname
		}).then(function(author){
			res.status(200).send({
				id:author.id,
				name:author.name,
				surname:author.surname
			});
		});
	}
	else {
		res.status(200).send({});
	}
});

app.get('/author/edit/:id', function(req, res){
	res.set("Content-Type","application/json;charset=UTF-8");
	var authId = req.params["id"];
	if(authId > 0 ){
		Author.findById(authId).then(function(author) {
			if(author){
				res.status(200).send({
					id:author.id,
					name:author.name,
					surname:author.surname
				});
			}
			else{
				res.status(200).send({});
			}
		});
	}
	else {
		res.status(200).send({});
	}
});
app.post('/author/edit/:id', function(req, res){
	res.set("Content-Type","application/json;charset=UTF-8");
	var authId = req.params["id"];
	var body = req.body || {};
	if(authId > 0 && body.name && body.name != '' && body.surname && body.surname != ''){
		Author.update({
			name : body.name,
			surname : body.surname
		}, {
			where : {id:authId}}
		);
		Author.findById(authId).then(function(author){
			if(author){
				res.status(200).send({
					id:author.id,
					name:author.name,
					surname:author.surname
				});
			}
			else{
				res.status(200).send({});
			}
		});
	}
	else {
		res.status(200).send({});
	}
});

app.get('/author/delete/:id', function(req, res){
	res.set("Content-Type","application/json;charset=UTF-8");
	var authId = req.params["id"];
	if(authId > 0){
		Author.destroy({
			where: {
				id: authId
			}
		});
		res.status(200).send({});
	}
	else {
		res.status(200).send({});
	}
});


// kitaplar
app.get('/book', function(req, res){
	res.set("Content-Type","application/json;charset=UTF-8");

	Book.findAll({
	//	include: [Author],
		include: [{ model: Author, as: 'Author', foreignKey:{name:'author', allowNull:false} }],
		order: 'name ASC',
		where: {'Author' : { $ne: 'null'}}
	}).then(function(book) {
		if(book){
			res.status(200).send(book);
		}
		else{
			res.status(200).send({});
		}
	});
});
app.post('/book/create', function(req, res){
	res.set("Content-Type","application/json;charset=UTF-8");

	var body = req.body || {};

	if(body.name && body.name != '' && body.author && body.author != ''){

		Book.create({
			name:body.name,
			author:body.author
		}).then(function(book){
			res.status(200).send({
				id:book.id,
				name:book.name,
				author:book.author
			});
		});
	}
	else {
		res.status(200).send({});
	}
});

app.get('/book/edit/:id', function(req, res){
	res.set("Content-Type","application/json;charset=UTF-8");
	var bookId = req.params["id"];

	if(bookId > 0){
		Book.findById(bookId).then(function(book) {
			if(book){
				res.status(200).send({
					id:book.id,
					name:book.name,
					author:book.author
				});
			}
			else{
				res.status(200).send({});
			}
		});
	}
	else {
		res.status(200).send({});
	}
});
app.post('/book/edit/:id', function(req, res){
	res.set("Content-Type","application/json;charset=UTF-8");
	var bookId = req.params["id"];
	var body = req.body || {};
	if(bookId > 0 && body.name && body.name != '' && body.author && body.author != ''){
		Book.update({
				name : body.name,
				author : body.author
			}, {
				where : {id:bookId}}
		);

		Book.findById(bookId).then(function(book){
			if(book){
				res.status(200).send({
					id:book.id,
					name:book.name,
					author:book.author
				});
			}
			else{
				res.status(200).send({});
			}
		});
	}
	else {
		res.status(200).send({});
	}
});
app.get('/book/delete/:id', function(req, res){
	res.set("Content-Type","application/json;charset=UTF-8");
	var authId = req.params["id"];
	if(authId > 0){
		Book.destroy({
			where: {
				id: authId
			}
		});
		res.status(200).send({});
	}
	else {
		res.status(200).send({});
	}
});

app.listen(8080);
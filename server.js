var express = require('express');
var app = express();
var jade = require('jade');
var config = require('./config/config.json');
var sequelize = require('sequelize');
var bodyParser = require('body-parser');
var path = require('path');

var restify = require('restify');

var client = restify.createJsonClient({
  url: 'http://localhost:8080',
  version: '~1.0'
});

app.set('views','./views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
  client.get('http://localhost:8080/products', function (err, _req, _res, obj) {
    console.log(_res.body);
    res.render('index', { products: JSON.parse(_res.body) });
    console.log(obj);
  });
});



var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('weeeeeee', host, port);
});



/// <reference path="../typings/tsd.d.ts" />
'use strict'

var pkg = require('../package.json');
var configJson = require('./config/environment');

module.exports = function(app){
	
	app.route('/api').get((req, res) => {
		res.json({"name": pkg.name, "version": "v1", "rev": pkg.version });
	});
  
	// app.route('/').get((req,res) =>{
	// 	//res.sendFile(app.get('appPath') + '/index.html',{ root: configJson.root });
	// 	res.sendFile('index.html');
	// });
	
	// app.get('/',function(req,res){
	//   res.sendFile(app.get('appPath') + '/home.html',{ root: configJson.root });
	// });
	
	app.get('/',function(req,res){
	  res.sendFile('server/home.html',{ root: './' });
	});
	
	app.get('/myapps',function(req,res){
	  res.sendFile('server/myapps.html',{ root: './' });
	});
	
}
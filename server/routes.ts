/// <reference path="../typings/tsd.d.ts" />
'use strict'

var pkg = require('../package.json');
var configJson = require('./config/environment');

module.exports = function(app){
	
	app.route('/api').get((req, res) => {
		res.json({"name": pkg.name, "version": "v1", "rev": pkg.version });
	});

	app.get('/',function(req,res){
	  res.sendFile('server/Home/home.html',{ root: './' });
	});
	
	app.get('/myapps',function(req,res){
	  res.sendFile('server/MyApps/myapps.html',{ root: './' });
	});
	
	app.use(function(req, res) {
      res.sendFile('server/Error/error.html',{ root: './' });
	});
	
}
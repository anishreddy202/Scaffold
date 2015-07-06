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
	
	app.get('/apps',function(req,res){
	  res.sendFile('server/apps/apps.html',{ root: './' });
	});
		app.get('/products',function(req,res){
	  res.sendFile('server/products/cms.html',{ root: './' });
	});
	
	app.use(function(req, res) {
      res.sendFile('server/Error/error.html',{ root: './' });
	});
	
}
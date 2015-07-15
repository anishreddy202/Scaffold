/// <reference path="../typings/tsd.d.ts" />
'use strict'

var pkg = require('../package.json');
var configJson = require('./config/environment');
var rest = require('restler');
var http = require('http');
var qs = require('querystring');
var Client = require('node-rest-client').Client;

module.exports = function(app){
	
	app.route('/api').get((req, res) => {
		


		var client = new Client();
		var queryParams = qs.stringify(req.query);
		var args ={
			headers:{ }
		}
		if(req.headers.apitoken)
			args.headers.apitoken = req.headers.apitoken;

			if(req.method == 'GET'){
				client.get(req.headers.realurl + "?"+ queryParams,args, function(data, response){
					var body = data.toString('utf-8');
					console.log(body);
					var parsed = {};
					try{
						parsed = JSON.parse(body);			
					}
					catch(ex){
						parsed = body;
					}
					res.json(parsed);
				});				
			}


		// console.log(req.headers);
		// console.log(queryParams);
		// if(req.method == 'GET'){
		// 	http.get(req.headers.realurl + "?"+ queryParams,function(response){			
		// 		var body = '';
		//         response.on('data', function(d) {
		//             body += d;
		//         });
		//         response.on('end', function() {


		//         });
				
		// 	})			
		// }
	});
	
	app.get('/',function(req,res){
	  res.sendFile('server/Home/home.html',{ root: './' });
	});
	
	app.get('/myapps',function(req,res){
	  res.sendFile('server/myapps/apps.html',{ root: './' });
	});
	
	app.get('/products',function(req,res){
	  res.sendFile('server/products/home.html',{ root: './' });
	});
	
	app.get('/communities',function(req,res){
	  res.sendFile('server/communities/index.html',{ root: './' });
	});
	
	app.get('/docs',function(req,res){
	  res.sendFile('server/docs/api.html',{ root: './' });
	});
	
	app.get('/devices',function(req,res){
	  res.sendFile('server/devices/index.html',{ root: './' });
	});
	
	app.use(function(req, res) {
      res.sendFile('server/Error/error.html',{ root: './' });
	});
	
}
/// <reference path="../typings/tsd.d.ts" />
'use strict'

var pkg = require('../package.json');

module.exports = function(app){
	
	app.route('/api').get((req, res) => {
		res.json({"name": pkg.name, "version": "v1", "rev": pkg.version });
	});
  
	app.route('/*').get((req,res) =>{
		res.sendFile(app.get('appPath') + '/index.html')
	});
}
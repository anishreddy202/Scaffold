/// <reference path="../../typings/tsd.d.ts" />
'use strict'

import express = require('express');
import path = require('path');

var bodyParser = require('body-parser')
var compression = require('compression');
var config = require('./environment');

module.exports = (app)=>{
	var env = config.env;
	app.set('view engine', 'html')
	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
	app.use(express.static(path.join(config.root, 'client')));
	app.use(express.static(path.join(config.root, 'server/public')));
	app.set('appPath', 'client'); 
}
/// <reference path="../typings/tsd.d.ts" />
'use strict';

import express = require('express');
import http = require('http');
var config = require('./config/environment');
import path = require('path');

var bodyParser = require('body-parser')
var compression = require('compression');

var app = express();
var server = http.createServer(app);

require('./config/express')(app);
require('./routes')(app);
	
server.listen(config.port,config.ip, () => {
	console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
	
module.exports = server;
/// <reference path="../../typings/angularjs/angular.d.ts" />
'use strict'

angular.module('uiApp',[
	'ui.router',
	'uiApp.home',
	'uiApp.bootstrap',
	'uiApp.cms'
	])
	.config(config);
	
function config($urlRouterProvider, $locationProvider){
	$urlRouterProvider.otherwise('/');
}
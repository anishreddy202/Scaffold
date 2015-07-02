/// <reference path="../../typings/angularjs/angular.d.ts" />
'use strict'

angular.module('uiApp',[
	'ui.router',
	'uiApp.header',
	'uiApp.home',
	'uiApp.myapps',
	'uiApp.bootstrap',
	'uiApp.cms'
	])
	.config(config);
	
function config($urlRouterProvider, $stateProvider){
	$urlRouterProvider.otherwise('/');
}
/// <reference path="../../typings/angularjs/angular.d.ts" />
'use strict'

angular.module('uiApp',[
	'ui.router',
	'uiApp.header',
	'uiApp.myapps',
	'uiApp.bootstrap',
	'uiApp.cms'
	])
	.config(config)
	.run(appRun);
	
function config($urlRouterProvider, $stateProvider){
	//$rootScope.uiView= true;
	$urlRouterProvider.otherwise('/');
		$stateProvider
		.state('', {
			url: '/',
			templateUrl: 'home.html',
	});
}

function appRun($rootScope, $location) {
  $rootScope.uiView = true;
  $rootScope.$on('$stateChangeStart', function (event, next) {
	  if(next.name == ""){
		  $rootScope.uiView = true;
	  }
	  else{
		 $rootScope.uiView = false; 
	  }
  });
}
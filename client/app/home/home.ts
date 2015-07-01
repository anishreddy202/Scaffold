/// <reference path="../app.d.ts" />

(function(){
	'use strict';
	
	angular
		.module('uiApp.home',[])
    	.config(config);
	
	function config($stateProvider) {
	    $stateProvider
	        .state('home', {
	            url: '/home',
				templateUrl: 'app/home/home.html',
	            controller: 'HomeCtrl',
	            controllerAs: 'vm'
	        });
	 }
})();
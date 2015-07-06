/// <reference path="../app.d.ts" />

(function(){
'use strict';

	angular
		.module('uiApp.myapps',['ui.router'])
		.config(config);

	function config($urlRouterProvider,$stateProvider) {
		$urlRouterProvider.otherwise('/myapps');
		$stateProvider
			.state('myapps', {
				url: '/myapps',
				templateUrl: 'myapps/myapps.html'
		});
	}
})();
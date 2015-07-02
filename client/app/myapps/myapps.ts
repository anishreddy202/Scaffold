/// <reference path="../app.d.ts" />

(function(){
'use strict';

	angular
		.module('uiApp.myapps',[])
		.config(config);

	function config($stateProvider) {
		$stateProvider
			.state('myapps', {
				url: '/myapps',
				templateUrl: 'app/myapps/myapps.html'
		});
	}
})();
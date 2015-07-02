/// <reference path="../app.d.ts" />

(function(){
'use strict';

	angular
		.module('uiApp.bootstrap',[])
		.config(config);

	function config($stateProvider) {
		$stateProvider
			.state('bootstrap', {
				url: '/bootstrap',
				templateUrl: 'app/bootstrap/bootstrap.html'
		});
	}
})();
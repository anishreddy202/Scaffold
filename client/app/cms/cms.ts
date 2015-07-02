/// <reference path="../app.d.ts" />

(function(){
'use strict';

	angular
		.module('uiApp.cms',[
			'uiApp.cms.users',
			'uiApp.cms.jobs',
		])
		.config(config);

	function config($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.when('/cms', '/cms/users');
		$stateProvider
			.state('cms', {
				url: '/cms',
				templateUrl: 'app/cms/cms.html'
			})
			.state('cms.users', {
				url: '/users',
				templateUrl: 'app/cms/users/users.html'
			})
			.state('cms.jobs', {
				url: '/jobs',
				templateUrl: 'app/cms/jobs/jobs.html'
			});
	}
})();
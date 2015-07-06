/// <reference path="../app.d.ts" />

(function(){
'use strict';

	angular
		.module('uiApp.cms',['ui.router'])
		.config(config);

	function config($urlRouterProvider,$stateProvider) {
		//$urlRouterProvider.otherwise('/cms');
		$urlRouterProvider.when('/cms', '/cms/users');
		$stateProvider
			.state('cms', {
				url: '/cms',
				templateUrl: 'apps/cms/cms.html'
			})			
			.state('cms.jobs', {
				url: '/jobs',
				templateUrl: 'apps/cms/jobs/jobs.html'
			})
			.state('cms.users', {
				url: '/users',
				templateUrl: 'apps/cms/users/users.html'
			})
	}
})();
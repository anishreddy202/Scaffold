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
				templateUrl: 'cms/cms.html'
			})			
			.state('cms.jobs', {
				url: '/jobs',
				templateUrl: 'cms/jobs/jobs.html'
			})
			.state('cms.users', {
				url: '/users',
				templateUrl: 'cms/users/users.html'
			})
	}
})();
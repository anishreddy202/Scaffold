/// <reference path="../app.d.ts" />

(function(){
  'use strict';

  angular
    .module('uiApp.docs')
    .controller('DocsCtrl', DocsCtrl);

  DocsCtrl.$inject = ['$http'];

  function DocsCtrl ($http) {
	  
    var vm = this;
	vm.markdown = '';
	vm.url = vm.swaggerUrl = 'apps/docs/swagger.json';
	
	$http.get('/apps/docs/apidoc.md').success(function(data){
		vm.markdown = data;
		// $http.get('/apps/docs/swagger.json').success(function(data){
		// 	console.log(data);
		// 	vm.swagerURL = data;
		// }).error(function(error){
		// 	console.log(error)
		// })
	}).error(function(error){
		console.log(error)
	});
	

  }

})();

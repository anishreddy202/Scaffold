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
	vm.transformFunction = transformFunction;
	vm.erroHandler = erroHandler;
	
	function transformFunction(/*request options*/ request){
		console.log(request.headers);
		request.headers['realURL'] = request.url;
		request.realURL =  request.url;
		request.url = "http://localhost:3000/api";
	}
	
	function erroHandler(/*HTTP response*/ response, /*HTTP status*/ status){
		console.log(response);
		console.log(status);
	}
	
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

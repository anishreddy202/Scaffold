/// <reference path="../app.d.ts" />

(function(){
  'use strict';

  angular
    .module('uiApp.header')
    .controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = ['$state'];

  function HeaderCtrl () {
    var vm = this;
	vm.message = "This is Header"
	
	vm.createApp = createApp;
	
	function createApp ($state){
		$state.go('myapps')
	}
  }

})();

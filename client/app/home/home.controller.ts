/// <reference path="../app.d.ts" />


(function(){
  'use strict';

  angular
    .module('uiApp.home')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [];

  function HomeCtrl () {
	  console.log('A');
    var vm = this;
	vm.message = 'Angular + TypeScript'
  }

})();



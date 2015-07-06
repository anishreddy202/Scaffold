/// <reference path="../app.d.ts" />

(function(){
  'use strict';

  angular
    .module('uiApp.header')
    .controller('HeaderCtrl', HeaderCtrl);

  HeaderCtrl.$inject = [];

  function HeaderCtrl () {
    var vm = this;
	vm.message = "This is Header"
  }

})();

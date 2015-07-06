/// <reference path="../app.d.ts" />

(function(){
  'use strict';

  angular
    .module('uiApp.myapps')
    .controller('MyAppsCtrl', MyAppsCtrl);

  MyAppsCtrl.$inject = [];

  function MyAppsCtrl () {
    var vm = this;
	vm.message = "This is MyApps"
  }

})();

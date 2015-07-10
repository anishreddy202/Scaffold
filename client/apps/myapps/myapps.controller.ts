/// <reference path="../app.d.ts" />

(function(){
  'use strict';

  angular
    .module('uiApp.myapps')
    .controller('MyAppsCtrl', MyAppsCtrl);

  MyAppsCtrl.$inject = [];

  function MyAppsCtrl () {
    var vm = this;
	
	vm.createNewApp = true;
	vm.newApp = {};
	vm.newApp.throttling = "Unlimited";
	
	vm.apps = [];
	vm.tiers = [
        "Unlimited",
        "Bronze",
        "Silver",
        "Code"
    ];  
	
	vm.createApp = createApp;
	vm.NewApp = NewApp;
	vm.viewApp = viewApp;
	vm.deleteApp = deleteApp;
	vm.updateApp = updateApp;
	vm.regenerate=regenerate;
	
	function createApp(){
		vm.newApp.id =  Math.floor((1 + Math.random()) * 0x10000);
		vm.newApp.isSelected = true;
		vm.newApp.status = 'APPROVED';
		vm.apps.push(vm.newApp);
		vm.createNewApp = false;
	};
	
	function NewApp(){
		vm.createNewApp = true;
		angular.forEach(vm.apps,function(app){
			app.isSelected = false;
		})
		vm.newApp = {};
		vm.newApp.throttling = "Unlimited";
	};
	
	function viewApp(app){
		//var appclone = angular.copy(app);
			
		angular.forEach(vm.apps,function(app1){
			app1.isSelected = false;
		})
		app.isSelected = true;
		vm.newApp = angular.copy(app);;
		vm.createNewApp = false;		
	};
	
	function updateApp(){
		angular.forEach(vm.apps,function(app1){
			if(app1.id === vm.newApp.id){
				app1.name = vm.newApp.name;
				app1.description = vm.newApp.description;
				app1.throttling = vm.newApp.throttling;
			}
		});
	}
	function deleteApp(){
		var apps = []
		angular.forEach(vm.apps,function(app1){
			if(app1.id !== vm.newApp.id){
				apps.push(app1);
			}
		});
		vm.apps = apps;
		
		if(vm.apps.length > 0){
			vm.newApp = vm.apps[vm.apps.length - 1];
			vm.newApp.isSelected = true;
		}
		else{
			vm.newApp = {};
			vm.newApp.throttling = "Unlimited";
			vm.createNewApp = true;
		}
	};
	
	function regenerate() {
		angular.forEach(vm.apps,function(app1){
			if(app1.id === vm.newApp.id){
				app1.applicationKey = Math.floor((1 + Math.random()) * 0x10000);
				app1.applicationSecret = Math.floor((1 + Math.random()) * 0x10000);
				app1.applicationToken = Math.floor((1 + Math.random()) * 0x10000);
				
				vm.newApp = app1;
			}
		});
	};
  }

})();

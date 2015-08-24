(function (){
	'use strict';

	angular.module("phonebookApp", [
		'ui.router',
		'ngMaterial',

		'sharedServices',
		'contacts',
		'contactDetail'
	])
	.run(['LocalStorage', function(LocalStorage){
		LocalStorage.getContacts();		
	}]);

	angular.module("sharedServices",[]);
	angular.module("contacts", ['sharedServices']);
	angular.module("contactDetail", ['sharedServices']);
})();
(function () {
	'use strict';

	angular.module("contactDetail").controller('addContactController', [
		'$scope', 
		'$state',
		'ContactList', 
		'LocalStorage',
		 function($scope, $state, ContactList, LocalStorage){

		 	$scope.contact = {
		 		name: "",
		 		phone: "", 
		 		email: ""
		 	};


			 $scope.cancel = function () {
			 	$state.go('home');
			 }

			 $scope.save = function (contact) {
			 	if (ContactList.root && !ContactList.root.key) { //fix after remove
			 		ContactList.root = null;
			 	}
			 	ContactList.insert(contact);
			 	LocalStorage.setContacts();

			 	// console.dir(ContactList)
			 	$state.go('home');
			 };
			
	}]);
})();
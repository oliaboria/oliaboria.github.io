(function () {
	'use strict';

	angular.module("contactDetail").controller('editContactController', [
		'$scope', 
		'$state',
		'$stateParams',
		'ContactList', 
		'LocalStorage',
		 function($scope, $state, $stateParams, ContactList, LocalStorage){

		 	function createContact (params) {
		 		var contact = {};
		 		for (var key in params) {
		 			if (params[key]) {
		 				contact[key] = params[key];
		 			}
		 			else {
		 				contact[key] = "";
		 			}
		 		}
		 		return contact;
		 	}

		 	$scope.isEdit = true;
		 	var updateContact = createContact($stateParams);
			$scope.contact = createContact($stateParams);
			
		 
			 $scope.cancel = function () {
			 	$state.go('home');
			 }

			 $scope.save = function (contact) {

			 	 var node = ContactList.search(updateContact);

			 	 ContactList.remove(node);

			 	 if (!ContactList.root.key) { // if remove the last node
			 	 	ContactList.root = null;
			 	 }

			 	 ContactList.insert(contact);
			 	 LocalStorage.setContacts();

			
			 	 $state.go('home');
			 };

			 $scope.delete = function (contact) {
			 	var node = ContactList.search(contact);
		 		node = ContactList.search(contact);
		 		ContactList.remove(node);
		 		LocalStorage.setContacts();
		 		$state.go('home');
			 }
			
	}]);
})();
(function () {
	'use strict';

	angular.module("contacts").controller('ContactListController', [
		'$scope', 
		'$state',
		'ContactList', 
		'LocalStorage',
		 function($scope, $state, ContactList, LocalStorage){

			var arrayOfContacts = []; 

			$scope.contacts = ContactList.toArray(arrayOfContacts, ContactList.root);

			$scope.addContact = function () {
				$state.go('add');
			};

			$scope.editContact = function (contact) {

				$state.go('edit', {
					name: contact.name,
					phone: contact.phone,
					email: contact.email,
				});

			}
		
	}]);
})();
(function () {
	'use strict';

	angular.module("sharedServices").factory('LocalStorage', [
		'ContactList', 
		'$window', 
		function(ContactList, $window){

		var contacts = {};

		contacts.getContacts = function () {
			var items = JSON.parse($window.localStorage.getItem("contacts"));
			if (!items || items.length === 0) return;

			ContactList.root = null;

			for (var i = 0; i < items.length; i++) {
				ContactList.insert(items[i]);
			}

			return items;
		};

		contacts.setContacts = function () {
			var arrayOfContacts = [];

			arrayOfContacts = ContactList.toArray(arrayOfContacts, ContactList.root);
			$window.localStorage.setItem("contacts", JSON.stringify(arrayOfContacts));

		};

		return contacts;
	}]);

})();
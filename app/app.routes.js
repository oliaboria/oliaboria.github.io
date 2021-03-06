(function() {
	'use strict';

	angular.module("phonebookApp")
		.config(
			function($stateProvider, $urlRouterProvider, $mdThemingProvider) {

				$urlRouterProvider.otherwise('/home');

				$stateProvider
			 		.state('home', {
			 			url: '/home',
						templateUrl: 'app/components/home/home.html',
						controller: 'ContactListController'
			 		})
			 		.state('edit', {
			 			url: '/edit?name&phone&email',
			 			templateUrl: 'app/components/contactDetail/detail.html',
			 			controller: 'editContactController'
			 			
			 		})
			 		.state('add', {
			 			url: '/add',
						templateUrl: 'app/components/contactDetail/detail.html',
						controller: 'addContactController'
			 		});

			 	$mdThemingProvider.theme('default')
	    			.primaryPalette('cyan')
	    			.accentPalette('pink');
			
		});

})();
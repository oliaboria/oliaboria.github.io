(function () {
	'use strict';

	angular.module("contactDetail").directive('validation', function(){
		return {
			require: 'ngModel',
			restrict: 'A', 
			link: function($scope, iElm, iAttrs, controller) {

				function checkValidity() {
					if ($scope.contact.name !== "" || $scope.contact.phone !== "" || $scope.contact.email !== "") {
						controller.$setValidity('invalid', true);
					}
					else {
						controller.$setValidity('invalid', false);
					}
				}

				checkValidity();

				$scope.$watchGroup(['contact.name','contact.phone', 'contact.email'], function (newVal, oldVal){
					if (newVal !== oldVal) {
						checkValidity();
					}
				});

				
			}
		};

	});
		
})();
(function () {
	'use strict';

	angular.module("contacts").filter('orderByName', function () {

		return function (items, name) {
			
			var filtered = [];

			function escapeRegExp(string) {
			    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
			}

			if (name && items) {
				var letterMatch = new RegExp(escapeRegExp(name), 'i');
				var item;

				for (var i = 0 ; i < items.length; i++) {

					 item = items[i];

					if (letterMatch.test(item.name.substring(0, letterMatch.length))) {
						filtered.push(item);
					}
				}

			}
			else {
				return items;
			}

			

			return filtered;

		}

	});
})();
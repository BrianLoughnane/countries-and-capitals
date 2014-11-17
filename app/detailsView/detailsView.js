// country-details.js

ccApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.when('/countries/city', {
			templateUrl: "./detailsView/detailsView.html",
			controller: "CountryDetailsCtrl"
		});
	}
]);

ccApp.controller('CountryDetailsCtrl', 
	['$scope', 'current',
		function($scope, current) {
			$scope.greeting = "Hello Country Details";

			$scope.details = current;


		}
	]
);

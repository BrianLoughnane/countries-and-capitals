// country-details.js

ccApp.config(['$routeProvider',
	function($routeProvider, $route) {
		$routeProvider
			.when('/countries/:city', {
				templateUrl: "./detailsView/detailsView.html",
				controller: "CountryDetailsCtrl",
				resolve: {
					cityParam: function(current) {
						return current.capital;
					}
				}
			});
	}
]);

ccApp.controller('CountryDetailsCtrl', 
	['$scope', 'current',
		function($scope, current, cityParam) {
			$scope.details = current;
			$scope.city = cityParam;
		}
	]
);

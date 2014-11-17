// country-list.js

ccApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/countries', {
		templateUrl: './listView/listView.html',
		controller: 'CountryListCtrl'
	});
}]);

ccApp.controller('CountryListCtrl', 
	['$scope', '$location', 'getCountryInfo', 'current', 'getCapInfo', 'getNeighbors',
		function($scope, $location, getCountryInfo, current, getCapInfo, getNeighbors) {
			$scope.countries = getCountryInfo();

			$scope.doll = current;

			
		}
	]
);

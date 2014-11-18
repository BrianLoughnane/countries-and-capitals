// country-list.js

ccApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/countries', {
		templateUrl: './listView/listView.html',
		controller: 'CountryListCtrl'
	});
}]);

ccApp.controller('CountryListCtrl', 
	['$scope', 'getCountryInfo', 'current',
		function($scope, getCountryInfo, current) {
			$scope.countries = getCountryInfo;
			$scope.current = current;
		}
	]
);

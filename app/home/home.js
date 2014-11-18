// home.js

ccApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: './home/home.html'
		// ,
		// controller: 'HomeCtrl'
	});
}]);

// ccApp.controller('HomeCtrl', ['$scope', function($scope) {
// }]);

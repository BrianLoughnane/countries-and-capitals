// country-details.js

ccApp.config(
	['$routeProvider',
		function($routeProvider) {
			$routeProvider
				.when('/countries/:city', {
					templateUrl: "./detailsView/detailsView.html",
					controller: "CountryDetailsCtrl as cd",
					resolve: {
						newCode: ['$route',
							function($route) {
								var code = $route.current.params.city;
								return code;
							}]
					}
				});
		}
	]
);

ccApp.controller('CountryDetailsCtrl', 
	['newCode', 'countryAndCap',
		function(newCode, countryAndCap) {
			var cd = this;

			countryAndCap(newCode)
				.then(function(r) {
					cd.details = r;
				});
		}
	]
);

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
	['newCode', 'countryAndCap', '$location',
		function(newCode, countryAndCap, $location) {
			var cd = this;

			cd.detailsLoaded = false;

			countryAndCap(newCode)
				.then(function(r) {
					cd.details = r;
					cd.detailsLoaded = true;
				});
		
			cd.goTo = function(code) {
				$location.path('/countries/' + code);
				cd = cd;	
			}
		}
	]
);

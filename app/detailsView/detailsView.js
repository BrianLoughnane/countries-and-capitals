// country-details.js

ccApp.config(
	['$routeProvider',
		function($routeProvider) {
			$routeProvider
				.when('/countries/:city', {
					templateUrl: "./detailsView/detailsView.html",
					controller: "CountryDetailsCtrl as cd"
					// ,
					// resolve: {
					// 	cityParam: function(current) {
					// 		return current.capital;
					// 	}
					// }
				});
		}
	]
);

ccApp.controller('CountryDetailsCtrl', 
	['current',
		function(current) {
			var cd = this;
			cd.details = current;
			// cd.city = cityParam;
		}
	]
);

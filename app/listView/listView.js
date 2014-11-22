// country-list.js

ccApp.config(
	['$routeProvider', 
		function($routeProvider) {
			$routeProvider.when('/countries', {
				templateUrl: './listView/listView.html',
				controller: 'CountryListCtrl as cl'
			});
		}
	]
);

ccApp.controller('CountryListCtrl', 
	['getCountryInfo', 'current',
		function(getCountryInfo, current) {
			var cl = this;
			cl.countries = getCountryInfo;
			cl.current = current;
		}
	]
);

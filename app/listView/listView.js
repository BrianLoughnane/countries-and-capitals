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
	['getCountryInfo', 'listLoaded', '$timeout', '$location',
		function(getCountryInfo, listLoaded, $timeout, $location) {
			var cl = this;
			cl.listLoaded = listLoaded;

			getCountryInfo.then(function(r) {
				cl.countries = r;
				cl.listLoaded.loaded = true;
			});
			

			cl.goTo = function(code) {
				$location.path('/countries/' + code);
				
			}
		}
	]
);

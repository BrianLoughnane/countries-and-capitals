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
	['getCountryInfo', 'current', '$timeout',
		function(getCountryInfo, current, $timeout) {
			var cl = this;
			cl.countries = getCountryInfo;
			cl.current = current;
			if(cl.current.needsLoad) {
				cl.loading = true;
				$timeout(function() {
					cl.loading = false;
					cl.current.needsLoad = false;
				}, 1500);	
			}
		}
	]
);

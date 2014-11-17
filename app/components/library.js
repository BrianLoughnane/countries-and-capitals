ccApp.factory('getCountryInfo', 
	['$http',
		function($http) {
			var countries = [];

			var config = {
				url: 'http://api.geonames.org/countryInfo?&username=devbrian1&type=json',
				method: 'GET'
			}

			$http(config)
				.success(function(data) {
					for (var i = 0; i < data.geonames.length; i++) {
						countries.push(data.geonames[i]);
					}

					console.log(data.geonames[0]);
				})
				.error(function(error) {
					console.log(error);
				})

			return function() {
				return countries;
			}			
		}
	]
);

ccApp.factory('current', function($location, getNeighbors, getCapInfo) {
	var current = {
		// getDetails: function(country, pop, area, cap, code) {
		// 	// set "current" service values
		// 		current.country = country;
		// 		current.population = pop;
		// 		current.area = area;
		// 		current.capital = cap;
		// 		current.countryCode = code;

		// 	// take user to detail view
		// 		$location.url('/countries/city'); 
				
		// 	// Make capital population call and display data
		// 		getCapInfo(country, cap, code);
		// 		current.neighbors = getNeighbors(code);
		// 	// Make neighbors poplulation call and display data

		// }
		getDetails: function(country, pop, area, cap, code) {
			// set "current" service values
				current.country = country;
				current.population = pop;
				current.area = area;
				current.capital = cap;
				current.countryCode = code;

			// take user to detail view
				$location.url('/countries/city'); 
				
			// Make capital population call and display data
				getCapInfo(country, cap, code);
				current.neighbors = getNeighbors(code);
			// Make neighbors poplulation call and display data

		}
	}

	return current;
});

ccApp.factory('getCapInfo', function ($http) {


	return function (country, capital, countryCode) {
		var query = capital + ', ' + country;

		var config = {
			url: 'http://api.geonames.org/search?',
			method: 'GET',
			params: {
				q: query,
				country: countryCode,
				name: capital,
				name_equals: capital,
				isNameRequired: true,
				username: 'devbrian1',
				type: 'json'
			}
		}

		$http(config)
			.success(function(r) {
				console.log(r);
			})
			.error(function(e) {
				console.log(e);
			});	
		
		return undefined;

	}
	

});

ccApp.factory('getNeighbors', function($http) {

	return function(code) {
		var neighbors = [];

		var config = {
			url: "http://api.geonames.org/neighboursJSON?username=devbrian1&country=" + code,
			method: "GET",
			params: {
				username: 'devbrian1',
				method: 'GET'
				// ,
				// type: 'json',
				// country: code
			}
		}

		$http(config)
			.success(function(r) {
				var n = r.geonames;

				for(var i = 0; i< n.length; i++) {
					neighbors.push(n[i].countryName);
				}
				console.log('getNeighbors',r);
				console.log('neighbors', n);
			})
			.error(function(e) {
				console.log(e);
			});

		return neighbors;
	}

});






















ccApp.run(
	['$templateCache', 
		function($templateCache) {
			$templateCache.put('listView.html', '<table><thead><tr><th>Name</th><th>Country Code</th><th>Capital</th><th>Area in km<sup>2</sup></th><th>Population</th><th>Continent</th></tr></thead><tbody><tr ng-repeat="country in countries" ng-click="current.getDetails(country.countryName, country.population, country.areaInSqKm, country.capital, country.countryCode)" ng-class-even="\'shaded\'"><td>{{ country.countryName }}</td><td>{{ country.countryCode }}</td><td>{{ country.capital }}</td><td>{{ country.areaInSqKm | number }}</td><td>{{ country.population | number }}</td><td>{{ country.continentName }}</td></tr></tbody></table><a href="/"><span class="button">Home</span></a>'); // end templateCache.put()
		}
	]
); // end run 

ccApp.factory('current', 
	['$location', 'getNeighbors', 'getCapInfo', 
		function($location, getNeighbors, getCapInfo) {
			var current = {
				getDetails: function(country, pop, area, cap, code) {
						current.country = country;
						current.population = pop;
						current.area = area;
						current.capital = cap;
						current.countryCode = code;
						getCapInfo(country, cap, code).then(function(r) {
							return current.capitalPopulation = r;
						});
						getNeighbors(code).then(function(r) {
							return current.neighbors = r;
						});
						$location.url('/countries/city'); 
				}
			}

			return current;
		}
	]
);

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
				})
				.error(function(error) {
					console.log(error);
				})

			return countries;			
		}
	]
);

ccApp.factory('getCapInfo', 
	['$http', '$q', 
		function($http, $q) {
			return function (country, capital, countryCode) {
				var defer = $q.defer();
				var query = capital + ', ' + country;
				var capitalPopulation;
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
						var arr = r.geonames;
						for (var i = 0; i < arr.length; i++) {
							var fcode = arr[i].fcodeName;
							var trim = fcode.trim();
							console.log(trim);
							if(trim == 'capital of a political entity') {
								console.log('truth be told');
								capitalPopulation = arr[i].population;
								console.log('capitalPopulation', capitalPopulation);
								defer.resolve(capitalPopulation);
							}
						}
						console.log('getCapInfo', arr[0]);
						capitalPopulation = 0;
					})
					.error(function(e) {
						console.log(e);
					});	
	
				return defer.promise;
			}
		}
	]
);

ccApp.factory('getNeighbors', 
	['$http', '$q',
		function($http, $q) {
			return function(code) {
				var defer = $q.defer();
				var config = {
					url: "http://api.geonames.org/neighboursJSON?username=devbrian1&country=" + code,
					method: "GET",
					params: {
						username: 'devbrian1',
						method: 'GET'
					}
				}

				$http(config)
					.success(function(r) {
						var neighbors = [];
						var n = r.geonames;
						for(var i = 0; i< n.length; i++) {
							neighbors.push(n[i].countryName);
						}
						defer.resolve(neighbors);

					})
					.error(function(e) {
						console.log(e);
					});

				return defer.promise;
			}
		}
	]
);






















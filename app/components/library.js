// ccApp.run(
// 	['$templateCache', 
// 		function($templateCache) {
// 			$templateCache.put('listView.html', 
// 				'<div class="loading" ng-if="cl.loading">
// 					<img src="images/loading.gif">
// 				</div>
// 				<div class="container" ng-class="{visible: !cl.loading}">
// 					<table>
// 						<thead>
// 							<tr>
// 								<th>Name</th>
// 								<th>Country Code</th>
// 								<th>Capital</th>
// 								<th>Area in km<sup>2</sup></th>
// 								<th>Population</th>
// 								<th>Continent</th>
// 							</tr>
// 						</thead>
// 						<tbody>
// 							<tr ng-repeat="country in cl.countries" ng-click="cl.goTo(country.countryCode)"  ng-class-even="\'shaded\'">
// 								<td>{{ country.countryName }}</td>
// 								<td>{{ country.countryCode }}</td>
// 								<td>{{ country.capital }}</td>
// 								<td>{{ country.areaInSqKm | number }}</td>
// 								<td>{{ country.population | number }}</td>
// 								<td>{{ country.continentName }}</td>
// 							</tr>
// 						</tbody>
// 					</table>


// 					<a href="/#/"><span class="button">Home</span></a>
// 				</div>'
// 			); // end templateCache.put()
// 		} // end function
// 	] // end array
// ); // end run method

ccApp.factory('listLoaded', 
	function() {
		return {
			loaded: false,
			isCached: false
		}
	}
);

ccApp.factory('getCountryInfo', 
	['$http', '$q',
		function($http, $q) {
			var defer = $q.defer();
			var config = {
				url: 'http://api.geonames.org/countryInfo?&username=devbrian1&type=json',
				method: 'GET',
				cache: true
			}

			$http(config)
				.success(function(data) {
					defer.resolve(data.geonames);
				})
				.error(function(error) {
					console.log(error);
				});

			return defer.promise;			
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
					method: "GET"
				}

				$http(config)
					.success(function(r) {
						var neighbors = {};

						if(r.geonames != void 0) {
							for(var i = 0; i< r.geonames.length; i++) {
								neighbors[r.geonames[i].countryCode] = r.geonames[i].countryName;
							}
							defer.resolve(neighbors);	
						} else {
							defer.resolve({});
						}
						

					})
					.error(function(e) {
						console.log(e);
					});

				return defer.promise;
			}
		}
	]
);

ccApp.factory('countryAndCap', 
	['getCountryInfo', 'getCapInfo', '$q', 'getNeighbors',
		function(getCountryInfo, getCapInfo, $q, getNeighbors) {
			return function(selectedCountryCode) {
				var country, neighbors, numberOfNeighbors, population, area, capital, countryCode, capitalPopulation;
				var defer = $q.defer();

				getCountryInfo
					.then(function(r) {
						for(var i = 0; i < r.length; i++) {
							if(r[i].countryCode == selectedCountryCode) {	
								country = r[i].countryName;
								capital = r[i].capital;
								countryCode = r[i].countryCode;
								area = r[i].areaInSqKm;
								population = r[i].population;
							}
						}

						return {
							country: country,
							capital: capital,
							countryCode: countryCode
						}
					})
					.then(function(r) {
						getCapInfo(r.country, r.capital, r.countryCode)
							.then(function(r) {
								capitalPopulation = r;

								getNeighbors(countryCode)
									.then(function(r) {
										neighbors = r;
										numberOfNeighbors = Object.getOwnPropertyNames(r).length;

										defer.resolve({
											country: country,
											capital: capital,
											countryCode: countryCode,
											population: population,
											capitalPopulation: capitalPopulation,
											area: area,
											neighbors: neighbors,
											numberOfNeighbors: numberOfNeighbors
										});				
									});
							});
					});
				
				return defer.promise;
			} 
		}
	]
);	
























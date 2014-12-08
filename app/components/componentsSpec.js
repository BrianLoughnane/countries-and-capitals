// cc-app.js

describe('ccApp', function() {
	it('should create a module named ccApp', function() {
		expect(ccApp).not.toEqual(null);
	});
});


// library.js

describe('listLoaded', function() {
	beforeEach(module('ccApp'));

	it('should return a basic object', 
	inject(function(listLoaded) {
		expect(listLoaded).toEqual({loaded:false, isCached:false});
	}));
});


describe('getCountryInfo', function() {
	beforeEach(module('ccApp'));

	it('should call "countryInfo" endpoint', 
	inject(function(getCountryInfo, $httpBackend) {
		$httpBackend.expectGET('http://api.geonames.org/countryInfo?&username=devbrian1&type=json');
	}));

	// it('should return a promise', 
	// inject(function(getCountryInfo) {
	// 	expect(getCountryInfo).toEqual('defer.promise');
	// }));
});

describe('getCapInfo', function() {
	beforeEach(module('ccApp'));

	it('should call the search endpoint', inject(function(getCapInfo, $httpBackend) {
		$httpBackend.expect('GET'
			, 'http://api.geonames.org/search?'
	
			// How do I test these query params which use variables?

			// , {
			// 	q: query,
			// 	country: countryCode,
			// 	name: capital,
			// 	name_equals: capital,
			// 	isNameRequired: true,
			// 	username: 'devbrian1',
			// 	type: 'json'
			// }
		)

	// How do I test the functionality in the .success() method?
		

	}));
});

describe('getNeighbors', function() {
	beforeEach(module('ccApp'));

	it('should', inject(function(getNeighbors, $httpBackend) {
		$httpBackend.expect('GET', 'http://api.geonames.org/neighboursJSON?');
	}));

	// Here, again, I have functionality in the success() method that needs testing
});

describe('countryAndCap', function() {
	beforeEach(module('ccApp'));

	it('should return a function', inject(function(countryAndCap) {
		expect(typeof countryAndCap).toEqual('function');
	}));

	it('should make the call the getCountry endpoint', inject(function(countryAndCap, $httpBackend) {
		
		//  It seems that the expect method is asserting successfully, regardless of the accuracy of the endpoint:

		// var r = $httpBackend.expect('GET', 'http://api.geonames.org/countryInfo?&username=devbrian1&type=json');
		var r = $httpBackend.expect('GET', 'bigFloppyDogEars');
		r = r;
		debugger;
	}));
});









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
		expect(typeof listLoaded).toEqual('object');
	}));
});


describe('getCountryInfo', function() {

	beforeEach(module('ccApp')); 

	afterEach(inject(function($httpBackend) {
		$httpBackend.verifyNoOutstandingExpectation(); 
		$httpBackend.verifyNoOutstandingRequest();
	}));

	it('should call "countryInfo" endpoint', function() {
		inject(
			function(getCountryInfo, $httpBackend) {
				$httpBackend.expectGET('http://api.geonames.org/countryInfo?&username=devbrian1&type=json').respond(200, "geonames");		
				$httpBackend.flush();
			}
		);	
	});


	it('should return a promise', inject(function(getCountryInfo, $httpBackend) {
		$httpBackend.expectGET('http://api.geonames.org/countryInfo?&username=devbrian1&type=json').respond(200, "geonames");
		$httpBackend.flush();
		expect(typeof getCountryInfo.then).toBe('function');
	}));
});

describe('getCapInfo', function() {
	beforeEach(module('ccApp'));

	it('should call the search endpoint', inject(function(getCapInfo, $httpBackend) {
		
		getCapInfo('Brazil', 'Brazilia', 'BR');

		$httpBackend.expect('GET'
			, 'http://api.geonames.org/search?isNameRequired=true&username=devbrian1q=brazil&country=BR&name='

/* -----------------------??--------------------------*/	
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
		).respond(200, /* put in real response */
			/* [ {somethings: here}, {otherstuffs: here}, {somegoodstuff: here} ]  */
		);

		$httpBackend.flush();

		// expect(capitalPopulation).toEqual('some number');
		

		$httpBackend.verifyNoOutstandingRequest();
		$httpBackend.verifyNoOutstandingExpectation();

/* -----------------------??--------------------------*/
	// How do I test the functionality in the .success() method given that the response is made up?
		
	// respond 500 test case

	}));
});

describe('getNeighbors', function() {
	beforeEach(module('ccApp'));

/* -----------------------??--------------------------*/
	// Here, again, I have a variable in the url that's not being set, and functionality in the success() method that needs testing

	it('should', inject(function(getNeighbors, $httpBackend) {
		$httpBackend.expect('GET', 'http://api.geonames.org/neighboursJSON?username=devbrian1&country=').respond(200, 'bang');
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingRequest();
		$httpBackend.verifyNoOutstandingExpectation();		
	}));

	
});

describe('countryAndCap', function() {
	beforeEach(module('ccApp'));

	it('should return a function', inject(function(countryAndCap) {
		expect(typeof countryAndCap).toEqual('function');
	}));

	it('should make the call the getCountry endpoint', inject(function(countryAndCap, $httpBackend) {
		$httpBackend.expect('GET', 'http://api.geonames.org/countryInfo?&username=devbrian1&type=json').respond(200, [{geonames:'something'}]);
		$httpBackend.flush();
		// $httpBackend.expect('GET', 'http://api.geonames.org/search?').respond(200);
		// $httpBackend.flush();
		$httpBackend.verifyNoOutstandingRequest();
		$httpBackend.verifyNoOutstandingExpectation();		
	}));

/* -----------------------??--------------------------*/
	// The program calls getCapInfo after getCountry resolves -- the previous test passed, but this one doesn't


	// it('should call the getCapInfo',inject(function(getCapInfo, $httpBackend) {
	// 	$httpBackend.expect('GET', 'http://api.geonames.org/search?').respond(200);
	// 	$httpBackend.flush();
	// }));
});









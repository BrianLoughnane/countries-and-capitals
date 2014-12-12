describe('Country Details Route Config', function() {

	beforeEach(module('ccApp'));

	it('should change the route', inject(function($route, $location, $httpBackend) {
		$httpBackend.expect('GET', './detailsView/detailsView.html').respond(200);
		$location.path('/countries/AR');

		$httpBackend.flush()

		expect($route.current.loadedTemplateUrl).toBe('./detailsView/detailsView.html');
		expect($route.current.controller).toBe('CountryDetailsCtrl as cd');

		$httpBackend.verifyNoOutstandingRequest();
		$httpBackend.verifyNoOutstandingExpectation();

	}));
});

describe('CountryDetailsController', function() {

	beforeEach(module('ccApp'));
	beforeEach(inject(function($rootScope, $controller) {
		var scope, ctrl;
		scope = $rootScope.$new();
		ctrl = $controller('CountryDetailsCtrl', {
			$scope: scope,
			newCode: 'AA',
		});
	}));

	it('should use the countryAndCap service', inject(function($httpBackend) {
		// This is throwing an error:  
		$httpBackend.expect('GET', 'something');

	}));


});
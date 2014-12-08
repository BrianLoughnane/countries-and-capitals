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
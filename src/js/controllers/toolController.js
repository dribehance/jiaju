// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("toolController", function($scope, $location, $anchorScroll, errorServices, toastServices, localStorageService, config) {
	$scope.top = function() {
		$location.hash("top");
		// call $anchorScroll()
		$anchorScroll();
	}
})
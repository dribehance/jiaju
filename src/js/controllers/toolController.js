// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("toolController", function($scope, $location, $anchorScroll, errorServices, toastServices, localStorageService, config) {
	$scope.top = function() {
		$location.hash("top");
		// call $anchorScroll()
		$anchorScroll();
	}
	$scope.show_compare_btn = true;
	var path = ["/index", "/vs_1", "/vs_2", "/vs_3", "/vs_4"];
	if (path.includes($location.path())) {
		$scope.show_compare_btn = false;
	}
	$scope.index = false;
	if ($location.path() == "/index") {
		$scope.index = true;
	}
	$scope.compare = function() {
		if ($location.path() == "/serial") {
			$location.path("/vs_2");
			return;
		}
		if ($location.path() == "/product") {
			$location.path("/vs_3");
			return;
		}
		$location.path("/vs_1");
	}
})
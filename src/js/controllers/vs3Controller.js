// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("vs3Controller", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.hover = function(cell) {
		$scope.hover_cell = cell;
	}
	$scope.product_compare_list = new Array(4);
	if (localStorageService.get("product_compare_list")) {
		angular.forEach(localStorageService.get("product_compare_list"), function(elem, i) {
			$scope.product_compare_list.unshift(elem);
		})
	}
	$scope.product_compare_list = $scope.product_compare_list.splice(0, 4);
});
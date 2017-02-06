// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("vs2Controller", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.hover = function(cell) {
		$scope.hover_cell = cell;
	}
	$scope.serial_compare_list = new Array(4);
	if (localStorageService.get("serial_compare_list")) {
		angular.forEach(localStorageService.get("serial_compare_list"), function(elem, i) {
			$scope.serial_compare_list.unshift(elem);
		})
	}
	$scope.serial_compare_list = $scope.serial_compare_list.splice(0, 4);
});
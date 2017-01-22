// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("vs2Controller", function($scope, errorServices, toastServices, localStorageService, config) {
	$scope.hover = function(cell) {
		$scope.hover_cell = cell;
	}
});
// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("serialColController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	toastServices.show();
	userServices.query_brand_list().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.brand_list = data.Result.FindJiajuBrandList;
			// $scope.input.brand = $scope.brand_list[0];
		} else {
			errorServices.autoHide(data.message);
		}
	});
	$scope.query_serial_list = function() {
		toastServices.show();
		userServices.query_serial_list({
			find_jiaju_brand_id: $scope.input.brand.find_jiaju_brand_id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.serial_list = data.Result.FindJiajuBrandSeriesList;
				// $scope.input.serial = $scope.serial_list[0];
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.query_taofang_list = function() {
		toastServices.show();
		userServices.query_taofang_list({
			find_jiaju_brand_series_id: $scope.input.serial.find_jiaju_brand_series_id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.taofang_list = data.Result.FSeriesRoomsList;
				// $scope.input.taofang = $scope.taofang_list[0];
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.query_compare_serial_by_id = function(id) {
		toastServices.show();
		userServices.query_compare_serial_by_id({
			find_jiaju_brand_series_id: id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.serial = data.Result.FindJiajuBrandSeries;
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.$watch("input.brand", function(n, o) {
		if (n) {
			$scope.query_serial_list();
		}
	}, true)
	$scope.$watch("input.serial", function(n, o) {
		if (n) {
			$scope.query_compare_serial_by_id(n.find_jiaju_brand_series_id);
		}
	}, true)
})
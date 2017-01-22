// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("vs3Controller", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.hover = function(cell) {
		$scope.hover_cell = cell;
	}
});
// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("colController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
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
	$scope.query_single_list = function() {
		toastServices.show();
		userServices.query_single_list({
			find_jiaju_brand_series_rooms_id: $scope.input.taofang.find_jiaju_brand_series_rooms_id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.single_list = data.Result.FBlankSinglesList;
				// $scope.input.single = $scope.single_list[0];
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.query_product = function(id) {
		toastServices.show();
		userServices.query_jiaju_product_by_id({
			find_jiaju_brand_series_rooms_blank_single_id: id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.product = data.Result.FSeriesRoomsBlankSingleDetail;
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
			$scope.query_taofang_list();
		}
	}, true)
	$scope.$watch("input.taofang", function(n, o) {
		if (n) {
			$scope.query_single_list();
		}
	}, true)
	$scope.$watch("input.single", function(n, o) {
		if (n) {
			$scope.query_product(n.find_jiaju_brand_series_rooms_blank_single_id);
		}
	}, true)
})
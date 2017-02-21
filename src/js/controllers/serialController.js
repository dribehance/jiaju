// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("serialController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.id) {
		$rootScope.back();
	}
	$scope.serial_id = $routeParams.id;
	localStorageService.set("serial_id", $scope.serial_id);
	toastServices.show();
	userServices.query_jiaju_serial_by_id({
		find_jiaju_brand_series_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.serial = data.Result.FindJiajuBrandSeriesDetail;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	var serial_compare_list = localStorageService.get("serial_compare_list") || [];
	$scope.add_to_compare = function() {
		var temp = {
			brand_id: localStorageService.get("brand_id"),
			serial_id: localStorageService.get("serial_id")
		}
		var unique = true;
		angular.forEach(serial_compare_list, function(elem, i) {
			if (JSON.stringify(elem) == JSON.stringify(temp)) {
				unique = false;
			}
		})
		if (unique) {
			serial_compare_list.push(temp);
		}
		localStorageService.set("serial_compare_list", serial_compare_list);
		errorServices.autoHide("已经加入对比，请点击页面右侧的产品对比查看");
	}
	$scope.preview = function() {
		$scope.auto_height = !$scope.auto_height;
	}
	$scope.query_charater_length = function(c) {
		if (!c) return;
		return c.length;
	}
})
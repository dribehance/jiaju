// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("productController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.id) {
		$rootScope.back();
	}
	$scope.product_id = $routeParams.id;
	localStorageService.set("product_id", $routeParams.id);
	toastServices.show();
	userServices.query_jiaju_product_by_id({
		find_jiaju_brand_series_rooms_blank_single_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.product = data.Result.FSeriesRoomsBlankSingleDetail;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	var product_compare_list = localStorageService.get("product_compare_list") || [];
	$scope.add_to_compare = function() {
		var temp = {
			brand_id: localStorageService.get("brand_id"),
			serial_id: localStorageService.get("serial_id"),
			taofang_id: localStorageService.get("taofang_id"),
			product_id: localStorageService.get("product_id"),
		}
		var unique = true;
		angular.forEach(product_compare_list, function(elem, i) {
			if (JSON.stringify(elem) == JSON.stringify(temp)) {
				unique = false;
			}
		})
		if (unique) {
			product_compare_list.push(temp);
		}
		localStorageService.set("product_compare_list", product_compare_list);
		errorServices.autoHide("已经加入对比");
	}
	$scope.preview = function() {
		$scope.auto_height = !$scope.auto_height;
	}
	$scope.query_charater_length = function(c) {
		if (!c) return;
		return c.length;
	}
})
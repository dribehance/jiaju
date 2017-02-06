// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("categoryInfoController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.id) {
		$rootScope.back();
	}
	toastServices.show();
	userServices.query_hangye_detail({
		hangye_insider_classify03_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.category_info = data.Result.HangyeInsider;
			$scope.supplier_list = data.Result.HangyeInsiderSupplierList;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.preview = function() {
		$scope.auto_height = !$scope.auto_height;
	}
	$scope.query_charater_length = function(c) {
		if (!c) return;
		return c.length;
	}
})
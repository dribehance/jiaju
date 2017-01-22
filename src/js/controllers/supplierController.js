// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("supplierController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!($routeParams.type && $routeParams.id)) {
		$rootScope.back();
	}
	toastServices.show();
	userServices.query_supplier_by_id({
		supplier_id: $routeParams.id,
		supplier_type: $routeParams.type
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.supplier = data.Result.HangyeInsiderClassify03Supplier;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})
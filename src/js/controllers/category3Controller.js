// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("category3Controller", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.id) {
		$rootScope.back();
	}
	toastServices.show();
	userServices.query_hangye_category3({
		hangye_insider_classify02_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.category_list = data.Result.HangyeInsiderClassify03List;
			$scope.supplier_list = data.Result.HangyeInsiderClassify03SupplierList;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})
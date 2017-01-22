// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("brandController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.id) {
		$rootScope.back();
	}
	toastServices.show();
	userServices.query_jiaju_brand_by_id({
		find_jiaju_brand_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.brand = data.Result.FindJiajuBrandDetail;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})
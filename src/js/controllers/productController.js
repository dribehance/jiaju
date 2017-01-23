// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("productController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.id) {
		$rootScope.back();
	}
	$scope.product_id = $routeParams.id;
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
})
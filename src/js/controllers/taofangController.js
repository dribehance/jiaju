// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("taofangController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.id) {
		$rootScope.back();
	}
	toastServices.show();
	userServices.query_jiaju_taofang_by_id({
		find_jiaju_brand_series_rooms_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.taofang = data.Result.FindJiajuBrandSeriesRoomsDetail;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})
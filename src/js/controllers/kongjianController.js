// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("kongjianController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.id) {
		$rootScope.back();
	}
	toastServices.show();
	userServices.query_jiaju_kongjian_by_id({
		find_jiaju_brand_series_rooms_blank_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.kongjian = data.Result.FindJiajuBrandSeriesRoomsBlankSingleList;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})
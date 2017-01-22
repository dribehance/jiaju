// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("imageGroupController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!($routeParams.id && $routeParams.type)) {
		$rootScope.back();
	}
	$scope.query_image_group_one_by_id = function() {
		toastServices.show();
		userServices.query_image_group_one_by_id({
			hangye_insider_images_id: $routeParams.id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.image_group = data;
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.query_image_group_two_by_id = function() {
		toastServices.show();
		userServices.query_image_group_two_by_id({
			find_jiaju_brand_series_rooms_blank_single_detail_images_id: $routeParams.id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.image_group = data;
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.type = $routeParams.type;
	$scope.type == 1 ? $scope.query_image_group_one_by_id() : $scope.query_image_group_two_by_id();
})
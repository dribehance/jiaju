// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("basicInfoController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	userServices.query_basicinfo().then(function(data) {
		$scope.user = data.Result.UserInfo;
		$scope.input = angular.extend({}, $scope.user)
	});
	$scope.input = {};
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.update_basicinfo({
			email: $scope.input.email,
			nickname: $scope.input.nickname,
			address: $scope.input.address
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.progress = function(p) {
		return Math.floor(p * 100);
	}
	$scope.$on("uploaded", function() {
		$scope.user.images_01 = "";
		userServices.query_basicinfo().then(function(data) {
			$scope.user = data.Result.UserInfo;
		})
	})
});
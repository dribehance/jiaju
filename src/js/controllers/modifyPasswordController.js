// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("modifyPasswordController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	userServices.query_basicinfo().then(function(data) {
		$scope.user = data.Result.UserInfo;
	});
	$scope.input = {};
	$scope.ajaxForm = function() {
		if ($scope.input.password_1 != $scope.input.password_2) {
			errorServices.autoHide("两次密码不一致");
			return;
		}
		toastServices.show();
		userServices.update_password({
			old_password: $scope.input.password,
			new_password: $scope.input.password_1,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.input = {};
				errorServices.autoHide(data.message);
			} else {
				$scope.input = {};
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
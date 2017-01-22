// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("forgetController", function($scope, $location, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	// 验证码
	$scope.countdown = {
		// count: "5",
		message: "获取验证码",
	}
	$scope.countdown.callback = function() {
		toastServices.show();
		userServices.get_smscode_2({
			telephone: $scope.input.telephone,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message)
			} else {
				$scope.countdown.reset = true;
				// $scope.modal.status = 3;
				errorServices.autoHide(data.message);
			}
		})
	};
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.forget({
			tel_code: $scope.input.smscode,
			telephone: $scope.input.telephone,
			password: $scope.input.password
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$location.path("signin").replace();
				}, 1000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})
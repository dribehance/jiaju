// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("signupController", function($scope, $location, $timeout, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	// 验证码
	$scope.countdown = {
		// count: "5",
		message: "获取验证码",
	}
	$scope.countdown.callback = function() {
		toastServices.show();
		userServices.get_smscode({
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
		userServices.signup({
			tel_code: $scope.input.smscode,
			telephone: $scope.input.telephone,
			password: $scope.input.password
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				localStorageService.set("token", data.token);
				errorServices.autoHide(data.message);
				$timeout(function() {
					$location.path("index").replace();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})
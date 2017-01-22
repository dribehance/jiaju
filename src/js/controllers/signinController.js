// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("signinController", function($scope, $timeout, $location, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.signin({
			telephone: $scope.input.telephone,
			password: $scope.input.password
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				localStorageService.set("token", data.token);
				errorServices.autoHide(data.message);
				$timeout(function() {
					$location.path("index").replace();
				}, 1000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})
// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("feedbackController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.feedback({
			name: $scope.input.name,
			contact: $scope.input.contact,
			content: $scope.input.content
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$scope.input = {};
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})
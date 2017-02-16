// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("searchJiajuController", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.kw) {
		$rootScope.back();
	}
	toastServices.show();
	userServices.search_jiaju({
		kw: $routeParams.kw
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.search_result = data.FindJiajuBeanList;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})
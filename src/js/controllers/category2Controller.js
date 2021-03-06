// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("category2Controller", function($scope, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.type) {
		$rootScope.back();
	}
	toastServices.show();
	userServices.query_hangye_category2({
		classify_type: $routeParams.type
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.category_list = data.Result.HangyeInsiderClassify02List;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})
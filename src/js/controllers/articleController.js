// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("articleController", function($scope, $sce, $rootScope, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.id) {
		$rootScope.back();
	}
	toastServices.show();
	userServices.query_pingce_article({
		jiaju_test_id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.article = data.Result.JiajuTest;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	$scope.parse_html = function(html) {
		return $sce.trustAsHtml(html);
	}
})
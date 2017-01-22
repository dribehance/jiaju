// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("distributorController", function($scope, $rootScope, $routeParams, $sce, userServices, errorServices, toastServices, localStorageService, config) {
	if (!$routeParams.id) {
		$rootScope.back();
	}
	toastServices.show();
	userServices.query_distributor_by_id({
		dealer_id: $routeParams.id,
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.distributor = data.Result.Dealer;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.trust_html = function(html) {
		return $sce.trustAsHtml(html);
	}
})
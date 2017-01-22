// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("indexController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	userServices.query_banner({
		location: 10,
		banner_type: 1
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.banners = data.Result.IndexBannerList;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	toastServices.show();
	userServices.query_hot().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.hot_articles = data.Result.JiajuTestHotList;
			$scope.focus_articles = data.Result.JiajuTestZhongdianList;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})
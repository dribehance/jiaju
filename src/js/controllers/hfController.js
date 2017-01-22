// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("hfController", function($scope, $rootScope, userServices, $location, $routeParams, errorServices, toastServices, localStorageService, config) {
	var route = [{
		"/index": 1
	}, {
		"/pingce": 2
	}, {
		"/article": 3
	}, {
		"/neimu": 4
	}, {
		"/category2": 5
	}, {
		"/category3": 6
	}, {
		"/category_info": 7
	}, {
		"/image_group": 8
	}, {
		"/jiaju": 9
	}, {
		"/brand": 10
	}, {
		"/serial": 11
	}, {
		"/taofang": 12
	}, {
		"/kongjian": 13
	}, {
		"/product": 14
	}, {
		"/vs_2": 15
	}, {
		"/vs_3": 16
	}, {
		"/vs_4": 17
	}, {
		"/vs_1": 18
	}, {
		"/comment": 19
	}, {
		"/create_comment": 20
	}, {
		"/query_price": 21
	}, {
		"/to_be_distributor": 22
	}, {
		"/distributors": 23
	}, {
		"/distributor": 24
	}, {
		"/supplier": 25
	}, {
		"/contact": 26
	}, {
		"/feedback": 27
	}, {
		"/search_category": 28
	}, {
		"/search_article": 29
	}, {
		"/image_group?type=2": 30
	}, {
		"/signin": 31
	}, {
		"/signup": 32
	}, {
		"/forget": 33
	}, {
		"/me": 34
	}];
	var ad_location = route[$location.path()];
	if (ad_location == 8 && $routeParams.type) {
		ad_location = 30;
	}
	$scope.staticImageUrl = $rootScope.staticImageUrl;
	console.log($scope.staticImageUrl)
	userServices.query_banner({
		location: ad_location,
		banner_type: 2
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.ads = data.Result.IndexBannerList;
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// search form
	$scope.input = {};
	$scope.input.category = "category";
	if ($location.path().indexOf("search_article") > 0) {
		$scope.input.category = "single";
	}
	$scope.input.kw = $routeParams.kw;
	$scope.ajaxForm = function() {
		if ($scope.input.category == "category") {
			$location.path("search_category").search("kw", $scope.input.kw);
			return;
		}
		$location.path("search_article").search("kw", $scope.input.kw);
	}
});
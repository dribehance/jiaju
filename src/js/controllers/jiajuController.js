// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("jiajuController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.category_list = [];
	toastServices.show();
	userServices.query_jiaju_category_list().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.category_list = data.Result.FindJiajuClassifyList;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.search_by_category = function(category) {
		category.check = !category.check;
		return;
	}
	$scope.query_category_type = function(type) {
		var t = $scope.category_list.filter(function(t) {
			return t.classify_type == type && t.check;
		});
		return t.length;
	}
	$scope.reset_type = function(type) {
		$scope.category_list.map(function(t) {
			if (t.classify_type == type) {
				t.check = false;
			}
		});
	}
	$scope.size = [7, 7, 7];
	$scope.more_type = function(type) {
		if ($scope.size[type - 1] == 1000) {
			$scope.size[type - 1] = 7;
			return;
		}
		$scope.size[type - 1] = 1000;
	}
	$scope.jiaju_list = [];
	$scope.page = {
		pn: 1,
		page_size: 1,
		message: "点击加载更多"
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_jiaju_list($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.jiaju_list = $scope.jiaju_list.concat(data.Result.FindJiajuBrandList.list);
				$scope.no_more = $scope.jiaju_list.length == data.Result.FindJiajuBrandList.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "没有了";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
})
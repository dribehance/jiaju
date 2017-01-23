// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("jiajuController", function($scope, $routeParams, $location, $anchorScroll, userServices, errorServices, toastServices, localStorageService, config) {
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
		$scope.query_jiaju_list();
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
	$scope.query_jiaju_list = function() {
		$scope.jiaju_list = {};
		var select_category = $scope.category_list.filter(function(c) {
			return c.check;
		})
		toastServices.show();
		userServices.query_jiaju_list({
			fengge_classify_ids: select_category.filter(function(f) {
				return f.classify_type == 1
			}).map(function(_f) {
				return _f.find_jiaju_classify_id
			}).join("#"),
			caizhi_classify_ids: select_category.filter(function(f) {
				return f.classify_type == 2
			}).map(function(_f) {
				return _f.find_jiaju_classify_id
			}).join("#"),
			kongjian_classify_ids: select_category.filter(function(f) {
				return f.classify_type == 3
			}).map(function(_f) {
				return _f.find_jiaju_classify_id
			}).join("#"),
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				var list = data.FindJiajuBrandList;
				list.map(function(l) {
					if (!Array.isArray($scope.jiaju_list[l.find_jiaju_index])) {
						$scope.jiaju_list[l.find_jiaju_index] = new Array();
					}
					$scope.jiaju_list[l.find_jiaju_index].push(l);
				})
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.query_jiaju_list();
	$scope.jump_index = function(index) {
		$location.hash(index);
		$anchorScroll();
	}
})
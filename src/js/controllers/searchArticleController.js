// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("searchArticleController", function($scope, $sce, $location, $routeParams, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.category_list = [];
	toastServices.show();
	userServices.query_pingce_category_list().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.category_list = data.Result.JiajuTestClassifyList;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.search_by_category = function(category) {
		category.check = !category.check;
		$scope.reload();
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
		$scope.reload();
	}
	$scope.size = [7, 7, 7];
	$scope.more_type = function(type) {
		if ($scope.size[type - 1] == 1000) {
			$scope.size[type - 1] = 7;
			return;
		}
		$scope.size[type - 1] = 1000;
	}
	$scope.trust_url = function(url) {
		return $sce.trustAsResourceUrl(url);
	}
	$scope.go = function(article) {
		$location.path("article").search("id", article.jiaju_test_id);
	}
	$scope.articles = [];
	$scope.page = {
		pn: 1,
		page_size: 10,
		message: "点击加载更多",
		kw: $routeParams.kw
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_pingce_article_list($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.articles = $scope.articles.concat(data.Result.JiajuTestList.list);
				$scope.no_more = $scope.articles.length == data.Result.JiajuTestList.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "已经加载完";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
	$scope.reload = function() {
		var select_category = $scope.category_list.filter(function(c) {
			return c.check;
		})
		$scope.articles = [];
		$scope.page = {
			pn: 1,
			page_size: 10,
			message: "点击加载更多",
			fengge_classify_ids: select_category.filter(function(f) {
				return f.classify_type == 1
			}).map(function(_f) {
				return _f.jiaju_test_classify_id
			}).join("#"),
			caizhi_classify_ids: select_category.filter(function(f) {
				return f.classify_type == 2
			}).map(function(_f) {
				return _f.jiaju_test_classify_id
			}).join("#"),
			kongjian_classify_ids: select_category.filter(function(f) {
				return f.classify_type == 3
			}).map(function(_f) {
				return _f.jiaju_test_classify_id
			}).join("#"),
			kw: $routeParams.kw
		}
		$scope.no_more = false;
		$scope.loadMore();
	}
})
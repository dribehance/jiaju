// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("settingController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	userServices.query_basicinfo().then(function(data) {
		$scope.user = data.Result.UserInfo;
	});
	$scope.comments = [];
	$scope.page = {
		pn: 1,
		page_size: 10,
		message: "点击加载更多",
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_my_comment($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.comments = $scope.comments.concat(data.Result.MyCommentList.list);
				$scope.no_more = $scope.comments.length == data.Result.MyCommentList.totalRow ? true : false;
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
	$scope.buy_aim = ["", "新房装修", "旧房升级", "重装新房", "小孩出生", "其他"];
	$scope.parse_aim = function(a) {
		return $scope.buy_aim[a];
	}
	$scope.progress = function(p) {
		return Math.floor(p * 100);
	}
	$scope.$on("uploaded", function() {
		$scope.user.images_01 = "";
		userServices.query_basicinfo().then(function(data) {
			$scope.user = data.Result.UserInfo;
		})
	})
});
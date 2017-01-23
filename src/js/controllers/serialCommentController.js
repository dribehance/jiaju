// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("serialCommentController", function($scope, userServices, $routeParams, errorServices, toastServices, localStorageService, config) {
	$scope.comments = [];
	$scope.page = {
		pn: 1,
		page_size: 10,
		message: "点击加载更多",
		find_jiaju_brand_series_id: $routeParams.id
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_serial_comment_by_id($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.comments = $scope.comments.concat(data.Result.CommentList.list);
				$scope.serial = data.Result.FindJiajuBrandSeriesDetail;
				$scope.no_more = $scope.comments.length == data.Result.CommentList.totalRow ? true : false;
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
})
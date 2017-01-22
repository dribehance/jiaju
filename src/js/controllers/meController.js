// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("meController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
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
// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("uploadAvatarController", function($scope, errorServices, toastServices, localStorageService, config) {
	var filename, extension, is_big = false;
	$scope.$on("flow::filesSubmitted", function(event, flow) {
		if (flow.files.length == 0) return;
		if (is_big) return;
		flow.files[0].name.replace(/.png|.jpg|.jpeg|.gif|.PNG|.JPG|.JPEG|.GIF/g, function(ext) {
			extension = ext;
			return ext;
		})
		filename = Math.round(Math.random() * 100000000);
		filename += new Date().getTime() + extension;
		flow.opts.target = config.url + "/app/UserCenter/UpdateAvatar";
		flow.opts.testChunks = false;
		flow.opts.fileParameterName = "images_01";
		flow.opts.query = {
			"invoke": "h5",
			"token": localStorageService.get("token"),
			// "images_01": filename
		};
		// toastServices.show();
		flow.upload();
	});
	$scope.$on('flow::fileAdded', function(event, flowFile, flow) {
		if (!{
				png: 1,
				gif: 1,
				jpg: 1,
				jpeg: 1
			}[flow.getExtension()]) {
			toastServices.hide();
			errorServices.autoHide("Picture is required")
			event.preventDefault(); //prevent file from uploading
			return;
		}
		if (parseFloat(flow.size) / 1000 > 3000) {
			is_big = true;
			toastServices.hide();
			errorServices.autoHide("Suggested size: 520*296, below 3M")
			event.preventDefault(); //prevent file from uploading
			return;
		}
		is_big = false;
	});
	$scope.$on('flow::fileSuccess', function(file, message, chunk) {
		// toastServices.hide();
		$scope.$emit("uploaded");
	});
})
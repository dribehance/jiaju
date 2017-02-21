// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("distributorsController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	$scope.provinces = ["北京市", "上海市", "天津市", "重庆市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区"]
	$scope.input.province = "全部";
	$scope.change_province = function(province) {
		$scope.input.province = province;
		$scope.input.city = "全部";
		userServices.query_cities().then(function(data) {
			$scope.cities = data[province]
		})
		$scope.query_distributors();
	}
	$scope.change_city = function(city) {
		$scope.input.city = city;
		$scope.query_distributors();
	}
	$scope.distributors = [];
	$scope.page = {
		pn: 1,
		page_size: 10,
		province: "",
		city: "",
		message: "点击加载更多",
		find_jiaju_brand_id: localStorageService.get("brand_id"),
		find_jiaju_brand_series_id: localStorageService.get("serial_id")
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_distributors($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.distributors = $scope.distributors.concat(data.Result.DealerList.list);
				$scope.no_more = $scope.distributors.length == data.Result.DealerList.totalRow ? true : false;
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
	$scope.query_distributors = function() {
		$scope.page = {
			pn: 1,
			page_size: 10,
			province: $scope.input.province == "全部" ? "" : $scope.input.province,
			city: $scope.input.city == "全部" ? "" : $scope.input.city,
			message: "点击加载更多"
		}
		$scope.no_more = false;
		$scope.distributors = [];
		$scope.loadMore();
	}
})
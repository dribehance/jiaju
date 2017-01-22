// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("queryPriceController", function($scope, $timeout, $location, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.input = {};
	toastServices.show();
	userServices.query_brand_list().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.brand_list = data.Result.FindJiajuBrandList;
			$scope.input.brand = $scope.brand_list[0];
		} else {
			errorServices.autoHide(data.message);
		}
	});
	$scope.query_serial_list = function() {
		userServices.query_serial_list({
			find_jiaju_brand_id: $scope.input.brand.find_jiaju_brand_id
		}).then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.serial_list = data.Result.FindJiajuBrandSeriesList;
				$scope.input.serial = $scope.serial_list[0];
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.query_taofang_list = function() {
		userServices.query_taofang_list({
			find_jiaju_brand_series_id: $scope.input.serial.find_jiaju_brand_series_id
		}).then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.taofang_list = data.Result.FSeriesRoomsList;
				$scope.input.taofang = $scope.taofang_list[0];
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.query_single_list = function() {
		userServices.query_single_list({
			find_jiaju_brand_series_rooms_id: $scope.input.taofang.find_jiaju_brand_series_rooms_id
		}).then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.single_list = data.Result.FBlankSinglesList;
				$scope.input.single = $scope.single_list[0];
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
	$scope.$watch("input.brand", function(n, o) {
		if (n) {
			$scope.query_serial_list();
		}
	}, true)
	$scope.$watch("input.serial", function(n, o) {
		if (n) {
			$scope.query_taofang_list();
		}
	}, true)
	$scope.$watch("input.taofang", function(n, o) {
		if (n) {
			$scope.query_single_list();
		}
	}, true)
	$scope.provinces = ["北京市", "上海市", "天津市", "重庆市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区"]
	$scope.input.province = $scope.provinces[0];
	$scope.query_distributors = function() {
		userServices.query_distributors({
			pn: 1,
			page_size: 1000,
			province: $scope.input.province,
			city: $scope.input.city,
			message: "点击加载更多"
		}).then(function(data) {
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.distributors = data.Result.DealerList.list;
				$scope.input.distributor = $scope.distributors[0];
			} else {
				errorServices.autoHide("服务器错误");
			}
		})
	}
	$scope.query_cities = function() {
		userServices.query_cities().then(function(data) {
			$scope.cities = data[$scope.input.province];
			$scope.input.city = $scope.cities[0];
		})
	}
	$scope.$watch("input.province", function(n, o) {
		if (n) {
			$scope.query_cities();
		}
	});
	$scope.$watch("input.city", function(n, o) {
		if (n) {
			$scope.query_distributors();
		}
	});
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.ask_price({
			"name": $scope.input.name,
			"telephone": $scope.input.telephone,
			"find_jiaju_brand_id": $scope.input.brand.find_jiaju_brand_id,
			"find_jiaju_brand_series_id": $scope.input.serial.find_jiaju_brand_series_id,
			"find_jiaju_brand_series_rooms_id": $scope.input.taofang.find_jiaju_brand_series_rooms_id,
			"find_jiaju_brand_series_rooms_blank_single_id": $scope.input.single.find_jiaju_brand_series_rooms_blank_single_id,
			"province": $scope.input.province,
			"city": $scope.input.city,
			"dealer_id": $scope.input.distributor.dealer_id,
			"building_area": $scope.input.building_area,
			"building_house": $scope.input.building_house,
			"price": $scope.input.price,
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				errorServices.autoHide(data.message);
				$timeout(function() {
					$location.path("index").replace();
				}, 2000)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})
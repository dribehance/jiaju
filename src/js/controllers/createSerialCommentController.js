// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").controller("createSerialCommentController", function($scope, $timeout, $location, userServices, errorServices, toastServices, localStorageService, config) {
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
	$scope.$watch("input.brand", function(n, o) {
		if (n) {
			$scope.query_serial_list();
		}
	}, true);
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
	var years = [],
		i = new Date().getFullYear();
	while (i > 2000) {
		years.push(i);
		i--;
	}
	$scope.years = years;
	$scope.input.year = $scope.years[0];
	$scope.months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
	$scope.input.month = $scope.months[0];
	$scope.ajaxForm = function() {
		toastServices.show();
		userServices.create_comment({
			"find_jiaju_brand_id": $scope.input.brand.find_jiaju_brand_id,
			"find_jiaju_brand_series_id": $scope.input.serial.find_jiaju_brand_series_id,
			"province": $scope.input.province,
			"city": $scope.input.city,
			"dealer_id": ($scope.input.distributor && $scope.input.distributor.dealer_id) || "",
			"price": $scope.input.price,
			"year": $scope.input.year,
			"month": $scope.input.month,
			"caizhi_score": $scope.input.caizhi_score || "",
			"gongneng_score": $scope.input.gongneng_score || "",
			"waiguan_score": $scope.input.waiguan_score || "",
			"gongyi_score": $scope.input.gongyi_score || "",
			"tuzhuang_score": $scope.input.tuzhuang_score || "",
			"huanbao_score": $scope.input.huanbao_score || "",
			"xingjiabi_score": $scope.input.xingjiabi_score || "",
			"manyidu_score": $scope.input.manyidu_score || "",
			"buy_aim": $scope.input.buy_aim,
			"use_ganshou": $scope.input.use_ganshou,
			"use_manyi": $scope.input.use_manyi,
			"use_not_manyi": $scope.input.use_not_manyi,
			"use_xilie_manyi": $scope.input.use_xilie_manyi,
			"use_xilie_not_manyi": $scope.input.use_xilie_not_manyi,
			"use_caizhi": $scope.input.use_caizhi,
			"use_gongneng": $scope.input.use_gongneng,
			"use_waiguan": $scope.input.use_waiguan,
			"use_gongyi": $scope.input.use_gongyi,
			"use_tuzhuang": $scope.input.use_tuzhuang,
			"use_huanbao": $scope.input.use_huanbao,
			"use_xingjiabi": $scope.input.iuse_xingjiabid,
			"use_qita": $scope.input.use_qita,
			"use_ben_xilie": $scope.input.use_ben_xilie,
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
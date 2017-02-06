angular.module("Pingce")
	.directive('vs3Col', function($timeout) {
		return {
			restrict: 'A',
			templateUrl: "templates/vs_3_col.html",
			scope: {
				brandId: "=?",
				serialId: "=?",
				taofangId: "=?",
				productId: "=?"
			},
			controller: function($scope, $rootScope, $element, $attrs, userServices, errorServices, toastServices, localStorageService, config) {
				$scope.staticImageUrl = $rootScope.staticImageUrl;
				$scope.input = {};
				toastServices.show();
				userServices.query_brand_list().then(function(data) {
					toastServices.hide()
					if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
						$scope.brand_list = data.Result.FindJiajuBrandList;
						angular.forEach($scope.brand_list, function(elem, i) {
							if (elem.find_jiaju_brand_id == $scope.brandId) {
								$scope.input.brand = elem;
							}
						})
					} else {
						errorServices.autoHide(data.message);
					}
				});
				$scope.query_serial_list = function() {
					toastServices.show();
					userServices.query_serial_list({
						find_jiaju_brand_id: $scope.input.brand.find_jiaju_brand_id
					}).then(function(data) {
						toastServices.hide()
						if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
							$scope.serial_list = data.Result.FindJiajuBrandSeriesList;
							angular.forEach($scope.serial_list, function(elem, i) {
								if (elem.find_jiaju_brand_series_id == $scope.serialId) {
									$scope.input.serial = elem;
								}
							})
						} else {
							errorServices.autoHide(data.message);
						}
					})
				}
				$scope.query_taofang_list = function() {
					toastServices.show();
					userServices.query_taofang_list({
						find_jiaju_brand_series_id: $scope.input.serial.find_jiaju_brand_series_id
					}).then(function(data) {
						toastServices.hide()
						if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
							$scope.taofang_list = data.Result.FSeriesRoomsList;
							angular.forEach($scope.taofang_list, function(elem, i) {
								if (elem.find_jiaju_brand_series_rooms_id == $scope.taofangId) {
									$scope.input.taofang = elem;
								}
							})
						} else {
							errorServices.autoHide(data.message);
						}
					})
				}
				$scope.query_single_list = function() {
					toastServices.show();
					userServices.query_single_list({
						find_jiaju_brand_series_rooms_id: $scope.input.taofang.find_jiaju_brand_series_rooms_id
					}).then(function(data) {
						toastServices.hide()
						if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
							$scope.single_list = data.Result.FBlankSinglesList;
							angular.forEach($scope.single_list, function(elem, i) {
								if (elem.find_jiaju_brand_series_rooms_blank_single_id == $scope.productId) {
									$scope.input.single = elem;
								}
							})
						} else {
							errorServices.autoHide(data.message);
						}
					})
				}
				$scope.query_product = function(id) {
					toastServices.show();
					userServices.query_jiaju_product_by_id({
						find_jiaju_brand_series_rooms_blank_single_id: id
					}).then(function(data) {
						toastServices.hide()
						if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
							$scope.product = data.Result.FSeriesRoomsBlankSingleDetail;
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
				$scope.$watch("input.single", function(n, o) {
					if (n) {
						$scope.query_product(n.find_jiaju_brand_series_rooms_blank_single_id);
					}
				}, true)
			},
			link: function(scope, element, attrs, ctrl) {}
		};
	});
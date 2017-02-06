angular.module("Pingce")
	.directive('vs2Col', function($timeout) {
		return {
			restrict: 'A',
			templateUrl: "templates/vs_2_col.html",
			scope: {
				brandId: "=?",
				serialId: "=?"
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
				$scope.query_compare_serial_by_id = function(id) {
					toastServices.show();
					userServices.query_compare_serial_by_id({
						find_jiaju_brand_series_id: id
					}).then(function(data) {
						toastServices.hide()
						if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
							$scope.serial = data.Result.FindJiajuBrandSeries;
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
						$scope.query_compare_serial_by_id(n.find_jiaju_brand_series_id);
					}
				}, true)
			},
			link: function(scope, element, attrs, ctrl) {}
		};
	});
// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").directive('dribehanceHeader', function($rootScope, userServices, localStorageService) {
	return {
		restrict: 'E',
		templateUrl: "templates/header.html",
		scope: {
			title: "=",
			backAction: "="
		},
		link: function(scope, element, attrs) {
			// function body
			scope.go = $rootScope.go;
			if (localStorageService.get("token")) {
				userServices.query_basicinfo().then(function(data) {
					scope.user = data.Result.UserInfo;
				})
			}
			scope.logout = function() {
				scope.user = "";
				localStorageService.remove("token");
			}
		}
	};
});
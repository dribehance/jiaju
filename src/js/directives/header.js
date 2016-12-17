// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").directive('dribehanceHeader', function($rootScope) {
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
		}
	};
});
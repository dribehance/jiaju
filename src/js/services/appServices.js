 // by dribehance <dribehance.kksdapp.com>
 // EventHandle
 angular.module("Pingce").factory("appServices", function($rootScope, $window, $location, errorServices, toastServices, config) {
 	var routeChangeStart = function(e) {
 		// do something white routechangestart,eg:
 		// toastServices.show();
 	}
 	var routeChangeSuccess = function(e, currentRoute, prevRoute) {
 		// do something white routechangesuccess,eg:
 		toastServices.hide();
 		errorServices.hide();
 		navBarHandler(e, currentRoute, prevRoute);
 	}
 	var routeChangeError = function(e, currentRoute, prevRoute) {
 		// do something white routechangesuccess,eg:
 		// $rootScope.back();
 	}
 	var navBarHandler = function(e, currentRoute, prevRoute) {
 		// handle navbar
 	}
 	var onBackKeyDown = function() {
 		$rootScope.$apply(function() {
 			$rootScope.back();
 		});
 	}
 	return {
 		init: function() {
 			$rootScope.$on("$routeChangeStart", routeChangeStart);
 			$rootScope.$on("$routeChangeSuccess", routeChangeSuccess);
 			$rootScope.$on("$routeChangeError", routeChangeError);
 			$rootScope.go = function(path) {
 				$location.path(path);
 			}
 			$rootScope.back = function() {
 				$window.history.back();
 			}
 			$rootScope.repeat_star = function(size) {
 				if (size) {
 					return new Array(size);
 				}
 				return [];
 			}
 			$rootScope.staticImageUrl = config.imageUrl;
 		}
 	}
 });
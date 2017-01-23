// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce", [
		"ngRoute",
		"ngSanitize",
		"LocalStorageModule",
		"flow",
		// "timer"
	])
	.config(function($routeProvider, $httpProvider, $locationProvider, localStorageServiceProvider, config) {
		angular.forEach(config.interceptor, function(path) {
			var controllername = path.replace(/_([0-9]|[a-z])/g, function(letter) {
				return letter.split("_")[1].toUpperCase();
			});
			controllername = controllername + "Controller";
			$routeProvider.when("/" + path, {
				templateUrl: "templates/" + path + ".html",
				reloadOnSearch: true,
				controller: controllername,
				resolve: {
					user: function($q, $location, localStorageService) {
						var resolve_path = ["me", "create_serial_comment", "create_single_comment"],
							defer = $q.defer();
						if (resolve_path.includes(path) && !localStorageService.get("token")) {
							defer.reject();
							$location.path("/signin").replace();
							return;
						}
						defer.resolve();
						return defer.promise;
					}
				}
			})
		})
		$routeProvider.otherwise("/index");
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
		localStorageServiceProvider.setStorageCookie(1 / 50);
		$httpProvider.interceptors.push('tokenInterceptor');
		// write log to console
		ImgCache.options.debug = false;

		// increase allocated space on Chrome to 50MB, default was 10MB
		ImgCache.options.chromeQuota = 50 * 1024 * 1024;

	}).run(function(appServices) {
		// init event such as routechangestart...
		ImgCache.init();
		appServices.init();
	});
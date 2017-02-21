// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").directive('duoshuoComment', function($timeout) {
	return {
		restrict: 'E',
		scope: {
			key: "@",
			title: "@",
			url: "@"
		},
		link: function(scope, element, attrs) {
			$timeout(function() {
				var el = document.createElement('div'); //该div不需要设置class="ds-thread"
				el.setAttribute('data-thread-key', scope.key); //必选参数
				el.setAttribute('data-url', scope.url); //必选参数
				el.setAttribute('data-title', scope.title); //可选参数
				DUOSHUO.EmbedThread(el);
				$(element).append(el);
			}, 2000)
		}
	};
});
angular.module("Pingce").constant("config", {
	url: "http://",
	imageUrl: "http://",
	request: {
		"SUCCESS": "200",
		"TOKEN_INVALID": "405"
	},
	response: {
		"SUCCESS": 1
	},
	common_params: {},
	interceptor: [
		"index",
		"pingce",
		"neimu",
		"jiaju",
		"contact",
		"category",
		"category_info",
		"article"
	]
});
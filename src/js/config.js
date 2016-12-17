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
		"article",
		"signin",
		"signup",
		"forget",
		"query_price",
		"feedback",
		"vs_1",
		"vs_2",
		"vs_3",
		"vs_4",
		"create_comment",
		"me",
		"supplier",
		"distributor",
		"comment",
		"to_be_distributor",
		"image_group",
		"brand",
		"serial",
		"taofang",
		"kongjian",
		"product"
	]
});
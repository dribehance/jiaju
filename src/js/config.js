angular.module("Pingce").constant("config", {
	url: "http://orsynsystem.com:8080",
	imageUrl: "http://orsynsystem.com:8080/files/image?name=",
	request: {
		"SUCCESS": "200",
		"TOKEN_INVALID": "405"
	},
	response: {
		"SUCCESS": 1
	},
	common_params: {
		invoke: "h5"
	},
	interceptor: [
		"index",
		"pingce",
		"article",
		"neimu",
		"category2",
		"category3",
		"category_info",
		"image_group",
		"jiaju",
		"brand",
		"serial",
		"taofang",
		"kongjian",
		"product",
		"vs_2",
		"vs_3",
		"vs_4",
		"vs_1",
		"single_comment",
		"serial_comment",
		"create_serial_comment",
		"create_single_comment",
		"query_price",
		"to_be_distributor",
		"distributors",
		"distributor",
		"supplier",
		"contact",
		"feedback",
		"search_category",
		"search_article",
		"search_jiaju",
		"signin",
		"signup",
		"forget",
		"me",
		"modify_password",
		"setting",
		"basic_info"
	]
});
// by dribehance <dribehance.kksdapp.com>
angular.module("Pingce").factory("userServices", function($rootScope, $http, apiServices, localStorageService, config) {
	return {
		// rsa encrypt
		rsa_key: apiServices._get(angular.extend({}, config.common_params, {
			url: "key/private_key.pem",
		})),
		// signin
		signin: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/Login",
		})),
		// signup
		signup: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/RegistTel",
		})),
		// forget password
		forget: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/ResetPassword",
		})),
		// reset password
		reset: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/SetPassword",
		})),
		get_smscode: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/getRegisterCode",
		})),
		get_smscode_1: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/GetSetCode",
			token: localStorageService.get("token")
		})),
		get_smscode_2: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/getForgetCode",
		})),
		// query user basic information
		query_basicinfo: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/UserCenter/baseInfo",
			token: localStorageService.get("token"),
			cache: false
		})),
		// query user basic information
		query_banner: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/HomeManage/bannerList",
		})),
		// 评测分类列表
		query_pingce_category_list: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/JiajuTestManage/jiajuTestClassify"
		})),
		// 评测文章列表
		query_pingce_article_list: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/JiajuTestManage/jiajuTestList"
		})),
		// 评测文章
		query_pingce_article: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/JiajuTestManage/jiajuTestDetail"
		})),
		// 行业内幕 二级分类
		query_hangye_category2: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/HangyeInsiderManage/hangyeInsiderClassify02"
		})),
		// 行业内幕 三级分类
		query_hangye_category3: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/HangyeInsiderManage/hangyeInsiderClassify03"
		})),
		// 行业内幕 详情
		query_hangye_detail: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/HangyeInsiderManage/hangyeInsiderDetail"
		})),
		// 行业供应商详情
		query_supplier_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/HangyeInsiderManage/supplierDetail"
		})),
		// 家具列表
		query_jiaju_list: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/FindJiajuManage/findJiajuBrandList"
		})),
		// 家具分类列表
		query_jiaju_category_list: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/FindJiajuManage/findJiajuClassify"
		})),
		// 家具品牌
		query_jiaju_brand_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/FindJiajuManage/findJiajuBrandDetail"
		})),
		// 家具系列
		query_jiaju_serial_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/FindJiajuManage/findJiajuBrandSeriesDetail"
		})),
		// 家具套房
		query_jiaju_taofang_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/FindJiajuManage/findJiajuBrandSeriesRoomsDetail"
		})),
		// 家具空间
		query_jiaju_kongjian_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/FindJiajuManage/findJiajuBrandSeriesRoomsBlankSingleList"
		})),
		// 家具单品详情
		query_jiaju_product_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/FindJiajuManage/fSeriesRoomsBlankSingleDetail"
		})),
		// 经销商列表
		query_distributors: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/DealerManage/dealerList",
		})),
		// 经销商
		query_distributor_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/DealerManage/dealerDetail"
		})),
		// 品牌列表
		query_brand_list: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/InquiryManage/fBrandList",
			cache: false
		})),
		// 系列列表
		query_serial_list: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/InquiryManage/fSeriesList",
			cache: false
		})),
		// 套房列表
		query_taofang_list: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/InquiryManage/fRoomsList",
			cache: false
		})),
		// 单品列表
		query_single_list: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/InquiryManage/fSinglesList",
			cache: false
		})),
		// 询价
		ask_price: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/InquiryManage/inquiry"
		})),
		// 申请成为经销商
		apply_distributor: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/DealerManage/dealerApply"
		})),
		// 城市列表
		query_cities: apiServices._get(angular.extend({}, config.common_params, {
			url: "city/city.json",
			cache: true
		})),
		// 首页热门推荐
		query_hot: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/HomeManage/jiajuTestHotList"
		})),
		// 图片对比详情
		query_compare_image_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/ComparisonManage/fBlankSingleImagesComp"
		})),
		// 系列对比详情
		query_compare_serial_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/ComparisonManage/findBrandSeriesDetail"
		})),
		// 评价对比详情
		query_compare_comment_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/ComparisonManage/fBlankSingleCommmentDetail"
		})),
		// 系列评价
		query_serial_comment_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/FindJiajuManage/fBrandSeriesCommentList"
		})),
		// 单品评价
		query_single_comment_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/FindJiajuManage/fBlankSingleCommmentList"
		})),
		// 单品评价
		query_single_comment_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/FindJiajuManage/fBlankSingleCommmentList"
		})),
		// 内幕图库
		query_image_group_one_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/HangyeInsiderManage/hangyeInsiderImgDetail"
		})),
		// 家具图库
		query_image_group_two_by_id: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/FindJiajuManage/fJiajuImgDetail"
		})),
		// 搜索文章
		search_article: apiServices._get(angular.extend({}, config.common_params, {
			url: config.url + "/app/FindJiajuManage/fJiajuImgDetail"
		})),
		// 发表评论
		create_comment: apiServices._get(angular.extend({}, config.common_params, {
			token: localStorageService.get("token"),
			url: config.url + "/app/CommentManage/comment"
		})),
		// 我的评论列表
		query_my_comment: apiServices._get(angular.extend({}, config.common_params, {
			token: localStorageService.get("token"),
			url: config.url + "/app/CommentManage/myCommentList"
		})),
	}
});
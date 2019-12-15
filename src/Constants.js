export default {
	// How many different dispatched actions determine loading progress
	// This is likely determined by how many dispatched actions you have below
	// in the created() method
	LOADING_SEGMENTS: 2,
	// DEV_DOMAIN: "http://vccw.test",
	// DEV_DOMAIN: "http://localhost",
	DEV_DOMAIN: "https://vivolog.net",
	API_BASE_PATH: "/wp-json/wp/v2/",
	API_MENU_PATH: "/wp-json/menus/v1/",
	API_RELATED_PATH: "/wp-json/related-posts-by-taxonomy/v1/",
	API_POPULAR_PATH: "/wp-json/wordpress-popular-posts/v1/",
	LOCATION_SLUG_HEADER_1: "header_menu_1",		// ヘッダーの固定ページメニューに紐づいたlocationのslug
	LOCATION_SLUG_HEADER_2: "header_menu_2",		// ヘッダーのカテゴリメニューに紐づいたlocationのslug
	LOCATION_SLUG_FOOTER_1: "footer_menu_1",		// フッターのカテゴリメニューに紐づいたlocationのslug
	ADMIN_USER_ID: 1,
	POSTS_LIST_LIMIT: 5,
};

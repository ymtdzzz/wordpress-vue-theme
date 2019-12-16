<?php
// Remove all default WP template redirects/lookups
remove_action( 'template_redirect', 'redirect_canonical' );

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
	add_rewrite_rule( '^/(.+)/?', 'index.php', 'top' );
}
add_action( 'init', 'remove_redirects' );

/**
 * OGP タグ出力
 */
add_action( 'wp_head', 'meta_ogp' );
function meta_ogp() {

	// title
	$title = is_single()
		? strip_tags(get_the_title()) . ' | ' . get_bloginfo('name')
		: get_bloginfo('name');

	echo '<meta property="og:title" content="' .$title .'">';
}

// jquery無効化
function deregister_scripts() {
	wp_deregister_script('jquery');
}

add_action('wp_enqueue_scripts', 'deregister_scripts');

// Load scripts
function load_vue_scripts() {
	wp_deregister_script('jquery-migrate');
	wp_deregister_script('jquery');

	wp_enqueue_script(
		'theme-js',
		get_stylesheet_directory_uri() . '/dist/scripts/main.bundle.js',
		false,
		filemtime( get_stylesheet_directory() . '/dist/scripts/main.bundle.js' ),
		true
	);

	wp_enqueue_style(
		'theme-css',
		get_stylesheet_directory_uri() . '/dist/styles.css',
		null,
		filemtime( get_stylesheet_directory() . '/dist/styles.css' )
	);
}
add_action( 'wp_enqueue_scripts', 'load_vue_scripts', 100 );

//// jquery無効化
//function deregister_scripts() {
//	wp_deregister_script('jquery');
//	wp_dequeue_script('jquery');
//}
//
//add_action('wp_enqueue_scripts', 'deregister_scripts', 99);
//
//add_filter( 'wp_default_scripts', 'dequeue_jquery_migrate' );
//function dequeue_jquery_migrate( $scripts){
//	if(!is_admin()){
//		$scripts->remove( 'jquery');
//		$scripts->add( 'jquery', false, array( 'jquery-core' ) );
//	}
//}
//
//add_filter('init',function(){
//	if (!is_admin()){
//		wp_deregister_script('jquery');
//	}
//});

add_action( 'after_setup_theme', 'register_menu' );
function register_menu() {
	register_nav_menu( 'header_menu_1', __( 'Header Menu 1', 'theme-slug' ) );
	register_nav_menu( 'header_menu_2', __( 'Header Menu 2', 'theme-slug' ) );
	register_nav_menu( 'footer_menu_1', __( 'Footer Menu 1', 'theme-slug' ) );
}

// 投稿を取得する再、タグ名称も取得する
function ag_filter_post_json($response, $post, $context) {
	$tags = wp_get_post_tags($post->ID);
	$response->data['tag_names'] = [];

	foreach ($tags as $tag) {
		$response->data['tag_names'][$tag->slug] = $tag->name;
	}

	return $response;
}

// 第三者のコメント投稿を許可する
function filter_rest_allow_anonymous_comments() {
	return true;
}
add_filter('rest_allow_anonymous_comments', 'filter_rest_allow_anonymous_comments');

add_theme_support('post-thumbnails');

// user情報の追加
function my_user_meta($wb) {
	$wb['twitter'] = 'twitter';
	$wb['facebook'] = 'facebook';
	$wb['github'] = 'github';
	$wb['instagram'] = 'instagram';
	return $wb;
}
add_filter('user_contactmethods', 'my_user_meta', 10, 1);

function adding_user_meta_rest() {
	register_rest_field(
		'user',
		'user_meta',
		array(
			'get_callback'      => 'facebook_get_user_field',
			'update_callback'   => null,
			'schema'            => null,
		)
	);
}
// サイト情報取得APIエンドポイント
function adding_site_info_rest() {
	register_rest_route(
		'wp/v2',
		'/siteinfo',
		array(
			'methods' => 'GET',
			'callback' => 'fetch_siteinfo'
		)
	);
}
function fetch_siteinfo(){
	$data = ['name'=>get_bloginfo('name'), 'desc'=>get_bloginfo('description')];

//	$response = new WP_REST_Response($data);
//	$response->set_status(200);
//	$domain = (empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"];
//	$response->header( 'Location', $domain );
//	return $response;
	return $data;
}
add_action('rest_api_init', 'adding_site_info_rest');

function facebook_get_user_field( $user, $field_name, $request ) {
	return array(
		'twitter' => get_the_author_meta('twitter',$user['id']),
		'facebook' => get_the_author_meta('facebook',$user['id']),
		'github' => get_the_author_meta('github',$user['id']),
		'instagram' => get_the_author_meta('instagram',$user['id']),
	);
}
add_action( 'rest_api_init', 'adding_user_meta_rest' );

// 関連記事取得API
add_filter( 'related_posts_by_taxonomy_wp_rest_api', '__return_true' );

add_filter( 'rest_prepare_post', 'ag_filter_post_json', 10, 3 );

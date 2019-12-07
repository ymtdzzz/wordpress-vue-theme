<?php
// Remove all default WP template redirects/lookups
remove_action( 'template_redirect', 'redirect_canonical' );

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
	add_rewrite_rule( '^/(.+)/?', 'index.php', 'top' );
}
add_action( 'init', 'remove_redirects' );

// Load scripts
function load_vue_scripts() {
	wp_enqueue_script(
		'theme-js',
		get_stylesheet_directory_uri() . '/dist/scripts/main.bundle.js',
		array( 'jquery' ),
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

add_action( 'after_setup_theme', 'register_menu' );
function register_menu() {
	register_nav_menu( 'header_menu_1', __( 'Header Menu 1', 'theme-slug' ) );
	register_nav_menu( 'header_menu_2', __( 'Header Menu 2', 'theme-slug' ) );
}

// 投稿を取得する再、タグ名称も取得する
function ag_filter_post_json($response, $post, $context) {
	$tags = wp_get_post_tags($post->ID);
	$response->data['tag_names'] = [];

	foreach ($tags as $tag) {
		$response->data['tag_names'][] = $tag->name;
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
function facebook_get_user_field( $user, $field_name, $request ) {
	return array(
		'twitter' => get_the_author_meta('twitter',$user['id']),
		'facebook' => get_the_author_meta('facebook',$user['id']),
		'github' => get_the_author_meta('github',$user['id']),
		'instagram' => get_the_author_meta('instagram',$user['id']),
	);
}
add_action( 'rest_api_init', 'adding_user_meta_rest' );

add_filter( 'rest_prepare_post', 'ag_filter_post_json', 10, 3 );

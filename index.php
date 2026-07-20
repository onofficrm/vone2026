<?php
include_once('./_common.php');

define('_INDEX_', true);
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

// 빌더 bridge 메인 (/_site.config.php → home_builder_bridge_id)
if (!isset($site_config) && is_file(G5_PATH . '/_site.config.php')) {
    include_once(G5_PATH . '/_site.config.php');
}
if (function_exists('g5site_cfg')) {
    $home_builder_id = g5site_cfg('home_builder_bridge_id', '');
    if ($home_builder_id !== '') {
        $home_builder_id = preg_replace('/[^a-z0-9_-]/i', '', $home_builder_id);
        if ($home_builder_id !== '') {
            if (!defined('ONOFF_BUILDER_LOADED') && defined('G5_PLUGIN_PATH')) {
                $builder_bootstrap = G5_PLUGIN_PATH . '/onoff-builder-bridge/bootstrap.php';
                if (is_file($builder_bootstrap)) {
                    include_once $builder_bootstrap;
                }
            }
            if (function_exists('onoff_builder_render_import_page')) {
                onoff_builder_render_import_page($home_builder_id);
                exit;
            }
        }
    }
}

// 테마 사용 시 테마 index로 위임
if (defined('G5_THEME_PATH')) {
    require_once(G5_THEME_PATH.'/index.php');
    return;
}

// 모바일은 mobile/index.php 사용
if (G5_IS_MOBILE) {
    include_once(G5_MOBILE_PATH.'/index.php');
    return;
}

include_once(G5_PATH.'/head.php');

$g5_main_sections = array(
    'hero',
    'service',
    'advantage',
    'portfolio',
    'latest',
    'review',
    'faq',
    'contact',
);
?>

<h2 class="sound_only">메인</h2>

<main id="siteMain" class="site-main">
<?php
foreach ($g5_main_sections as $section_name) {
    $section_file = G5_PATH.'/section/'.$section_name.'.php';
    if (is_file($section_file)) {
        include_once($section_file);
    }
}
?>
</main>

<?php
include_once(G5_PATH.'/tail.php');

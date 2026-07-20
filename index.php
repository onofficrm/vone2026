<?php
/**
 * 루트 홈
 * - home_builder_bridge_id 가 있으면 DB 부트스트랩 없이 빌더 HTML을 즉시 출력
 *   (랜딩 SPA는 DB가 필요 없고, DB 장애 시에도 홈이 열리도록 함)
 * - 미설정·파일 없음일 때만 그누보드 공통 로직으로 폴백
 */

$home_builder_id = '';
$site_config_file = __DIR__ . '/_site.config.php';
if (is_file($site_config_file)) {
    $cfg_raw = @file_get_contents($site_config_file);
    if (is_string($cfg_raw) && preg_match("/'home_builder_bridge_id'\\s*=>\\s*'([^']*)'/", $cfg_raw, $m)) {
        $home_builder_id = preg_replace('/[^a-z0-9_-]/i', '', $m[1]);
    }
}

if ($home_builder_id !== '') {
    $import_index = __DIR__ . '/plugin/onoff-builder-bridge/imports/' . $home_builder_id . '/index.html';
    if (is_file($import_index)) {
        $html = @file_get_contents($import_index);
        if (is_string($html) && $html !== '') {
            $asset_base = '/plugin/onoff-builder-bridge/imports/' . $home_builder_id . '/assets/';
            $html = preg_replace('#\s(src|href)=(["\'])/assets/#i', ' $1=$2' . $asset_base, $html);
            $html = preg_replace('#\s(src|href)=(["\'])\\./assets/#i', ' $1=$2' . $asset_base, $html);
            $html = preg_replace('#\s(src|href)=(["\'])assets/#i', ' $1=$2' . $asset_base, $html);
            header('Content-Type: text/html; charset=utf-8');
            echo $html;
            exit;
        }
    }
}

include_once('./_common.php');

define('_INDEX_', true);
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

// 빌더 bridge 메인 (공통 부트스트랩 경유 — 관리/확장 기능용 폴백)
if (!isset($site_config) && is_file(G5_PATH . '/_site.config.php')) {
    include_once(G5_PATH . '/_site.config.php');
}
if (function_exists('g5site_cfg')) {
    $bridge_id = g5site_cfg('home_builder_bridge_id', '');
    if ($bridge_id !== '') {
        $bridge_id = preg_replace('/[^a-z0-9_-]/i', '', $bridge_id);
        if ($bridge_id !== '') {
            if (!defined('ONOFF_BUILDER_LOADED') && defined('G5_PLUGIN_PATH')) {
                $builder_bootstrap = G5_PLUGIN_PATH . '/onoff-builder-bridge/bootstrap.php';
                if (is_file($builder_bootstrap)) {
                    include_once $builder_bootstrap;
                }
            }
            if (function_exists('onoff_builder_render_import_page')) {
                onoff_builder_render_import_page($bridge_id);
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

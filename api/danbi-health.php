<?php
/**
 * DB 연결 헬스체크 (짧은 타임아웃)
 * URL: /api/danbi-health.php
 * - common.php 미사용 (연결 대기로 FPM 고갈 방지)
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$result = array(
    'success' => true,
    'php' => PHP_VERSION,
    'time' => date('c'),
    'dbconfig' => false,
    'db_connect' => false,
    'db_error' => '',
    'mailbox_writable' => false,
    'feed_readable' => false,
);

$root = dirname(__FILE__) . '/..';
$inbox_dir = $root . '/plugin/onoff-builder-bridge/imports/danbicar';
$feed = $inbox_dir . '/home-feed.json';
$result['feed_readable'] = is_file($feed) && is_readable($feed);
$result['mailbox_writable'] = is_dir($inbox_dir) && is_writable($inbox_dir);

$dbconfig = $root . '/data/dbconfig.php';
if (is_file($dbconfig) && is_readable($dbconfig)) {
    $result['dbconfig'] = true;
    $src = (string) @file_get_contents($dbconfig);
    $host = $user = $pass = $db = '';
    if (preg_match("/define\\(\\s*'G5_MYSQL_HOST'\\s*,\\s*'([^']*)'\\s*\\)/", $src, $m)) {
        $host = $m[1];
    }
    if (preg_match("/define\\(\\s*'G5_MYSQL_USER'\\s*,\\s*'([^']*)'\\s*\\)/", $src, $m)) {
        $user = $m[1];
    }
    if (preg_match("/define\\(\\s*'G5_MYSQL_PASSWORD'\\s*,\\s*'([^']*)'\\s*\\)/", $src, $m)) {
        $pass = $m[1];
    }
    if (preg_match("/define\\(\\s*'G5_MYSQL_DB'\\s*,\\s*'([^']*)'\\s*\\)/", $src, $m)) {
        $db = $m[1];
    }

    if ($host !== '' && function_exists('mysqli_init')) {
        $mysqli = mysqli_init();
        if ($mysqli) {
            @mysqli_options($mysqli, MYSQLI_OPT_CONNECT_TIMEOUT, 2);
            $ok = @mysqli_real_connect($mysqli, $host, $user, $pass, $db);
            if ($ok) {
                $result['db_connect'] = true;
                @mysqli_close($mysqli);
            } else {
                $result['db_error'] = function_exists('mysqli_connect_error') ? (string) mysqli_connect_error() : 'connect failed';
            }
        }
    } else {
        $result['db_error'] = 'dbconfig parse incomplete or mysqli unavailable';
    }
} else {
    $result['db_error'] = 'data/dbconfig.php not found';
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);
exit;

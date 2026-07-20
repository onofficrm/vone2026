<?php
/**
 * 상담 폼 CSRF 토큰 발급 (JSON)
 * URL: /proc/inquiry-token.php
 */
include_once dirname(__FILE__) . '/../_common.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

if (!defined('_GNUBOARD_')) {
    echo json_encode(array('success' => false, 'message' => '접근이 올바르지 않습니다.'), JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array('success' => false, 'message' => '잘못된 요청입니다.'), JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    if (function_exists('random_bytes')) {
        $token = bin2hex(random_bytes(16));
    } else {
        $token = md5(uniqid((string) mt_rand(), true));
    }
} catch (Exception $e) {
    $token = md5(uniqid((string) mt_rand(), true));
}

set_session('onoff_inquiry_token', $token);

echo json_encode(
    array(
        'success' => true,
        'token'   => $token,
    ),
    JSON_UNESCAPED_UNICODE
);
exit;

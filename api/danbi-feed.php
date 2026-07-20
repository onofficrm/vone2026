<?php
/**
 * 단비카 홈 피드 (DB 없이 JSON 제공)
 * - 기본: imports/danbicar/home-feed.json
 * - DB 복구 후: ?source=board 로 게시판 연동 엔드포인트 사용
 *
 * URL: /api/danbi-feed.php
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: public, max-age=60');
header('Access-Control-Allow-Origin: *');

$source = isset($_GET['source']) ? trim((string) $_GET['source']) : 'json';

if ($source === 'board') {
    // 게시판 연동은 별도 스크립트 (common.php/DB 필요)
    $board_script = dirname(__FILE__) . '/danbi-feed-board.php';
    if (is_file($board_script)) {
        include $board_script;
        exit;
    }
    http_response_code(503);
    echo json_encode(
        array(
            'success' => false,
            'message' => '게시판 연동 스크립트가 아직 준비되지 않았습니다. source=json 을 사용하세요.',
        ),
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

$candidates = array(
    dirname(__FILE__) . '/../plugin/onoff-builder-bridge/imports/danbicar/home-feed.json',
    dirname(__FILE__) . '/../build/danbicar/public/home-feed.json',
);

$json = '';
foreach ($candidates as $path) {
    if (is_file($path) && is_readable($path)) {
        $json = (string) file_get_contents($path);
        if ($json !== '') {
            break;
        }
    }
}

if ($json === '') {
    http_response_code(404);
    echo json_encode(array('success' => false, 'message' => 'home-feed.json 을 찾을 수 없습니다.'), JSON_UNESCAPED_UNICODE);
    exit;
}

echo $json;
exit;

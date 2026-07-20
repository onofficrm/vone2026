<?php
/**
 * 단비카 홈 피드 — 게시판 연동 (DB 필요)
 * /api/danbi-feed.php?source=board 에서 include
 *
 * 설정 (_site.config.php 권장 키):
 * - danbi_feed_review_bo_table   (기본: review 또는 비우면 reviews만 JSON 유지)
 * - danbi_feed_status_bo_table
 * - danbi_feed_car_bo_table
 *
 * DB/PHP가 불안정하면 이 파일을 호출하지 말고 JSON 피드를 사용하세요.
 */
if (!defined('_GNUBOARD_')) {
    include_once dirname(__FILE__) . '/../_common.php';
}

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if (!defined('_GNUBOARD_') || !isset($g5['write_prefix'])) {
    http_response_code(503);
    echo json_encode(array('success' => false, 'message' => '그누보드 공통 로드에 실패했습니다.'), JSON_UNESCAPED_UNICODE);
    exit;
}

if (is_file(G5_PATH . '/_site.config.php')) {
    include_once G5_PATH . '/_site.config.php';
}

function danbi_feed_cfg($key, $default = '')
{
    if (function_exists('g5site_cfg')) {
        $v = g5site_cfg($key, $default);
        return $v !== '' ? $v : $default;
    }
    return $default;
}

function danbi_feed_board_rows($bo_table, $limit = 12)
{
    global $g5;
    $bo_table = preg_replace('/[^a-z0-9_]/i', '', (string) $bo_table);
    if ($bo_table === '' || !isset($g5['write_prefix'])) {
        return array();
    }
    $write_table = $g5['write_prefix'] . $bo_table;
    $limit = max(1, min(30, (int) $limit));
    $sql = " select wr_id, wr_subject, wr_content, wr_1, wr_2, wr_3, wr_4, wr_5, wr_datetime
             from {$write_table}
             where wr_is_comment = 0
             order by wr_num, wr_reply
             limit {$limit} ";
    $result = @sql_query($sql);
    $rows = array();
    if (!$result) {
        return $rows;
    }
    while ($row = sql_fetch_array($result)) {
        $rows[] = $row;
    }
    return $rows;
}

$payload = array(
    'success' => true,
    'source' => 'board',
    'updatedAt' => date('Y-m-d'),
    'isSample' => false,
    'consultations' => array(),
    'reviews' => array(),
    'cars' => array(),
);

$status_bo = danbi_feed_cfg('danbi_feed_status_bo_table', '');
$review_bo = danbi_feed_cfg('danbi_feed_review_bo_table', '');
$car_bo = danbi_feed_cfg('danbi_feed_car_bo_table', '');

foreach (danbi_feed_board_rows($status_bo, 12) as $row) {
    $payload['consultations'][] = array(
        'name' => isset($row['wr_1']) && $row['wr_1'] !== '' ? $row['wr_1'] : cut_str($row['wr_subject'], 20),
        'type' => isset($row['wr_2']) ? $row['wr_2'] : '',
        'car' => isset($row['wr_3']) ? $row['wr_3'] : '',
        'status' => isset($row['wr_4']) && $row['wr_4'] !== '' ? $row['wr_4'] : '상담 접수',
        'tone' => isset($row['wr_5']) && $row['wr_5'] !== '' ? $row['wr_5'] : 'neutral',
    );
}

foreach (danbi_feed_board_rows($review_bo, 8) as $i => $row) {
    $payload['reviews'][] = array(
        'id' => (int) $row['wr_id'],
        'title' => $row['wr_subject'],
        'carName' => isset($row['wr_1']) ? $row['wr_1'] : '',
        'situation' => isset($row['wr_2']) ? $row['wr_2'] : '',
        'process' => isset($row['wr_3']) ? $row['wr_3'] : '',
        'review' => trim(strip_tags($row['wr_content'])),
        'region' => isset($row['wr_4']) ? $row['wr_4'] : '',
        'date' => substr($row['wr_datetime'], 0, 10),
        'image' => isset($row['wr_5']) && $row['wr_5'] !== '' ? $row['wr_5'] : 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&fm=webp&w=800',
    );
}

foreach (danbi_feed_board_rows($car_bo, 24) as $row) {
    $payload['cars'][] = array(
        'id' => (int) $row['wr_id'],
        'manufacturer' => isset($row['wr_1']) ? $row['wr_1'] : '',
        'name' => $row['wr_subject'],
        'year' => isset($row['wr_2']) ? $row['wr_2'] : '',
        'mileage' => isset($row['wr_3']) ? $row['wr_3'] : '',
        'fuel' => isset($row['wr_4']) ? $row['wr_4'] : '',
        'type' => isset($row['wr_5']) ? $row['wr_5'] : '',
        'image' => 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&fm=webp&w=800',
        'priceLabel' => '상담 문의',
        'monthlyLabel' => '조건에 따라 확인',
        'stock' => '상담 후 확인',
    );
}

// 게시판이 비어 있으면 JSON 폴백
if (!$payload['consultations'] && !$payload['reviews'] && !$payload['cars']) {
    $json_path = G5_PATH . '/plugin/onoff-builder-bridge/imports/danbicar/home-feed.json';
    if (is_file($json_path)) {
        $raw = file_get_contents($json_path);
        if ($raw) {
            echo $raw;
            exit;
        }
    }
}

echo json_encode($payload, JSON_UNESCAPED_UNICODE);
exit;

<?php
/**
 * 단비카 문의 메일함 (DB 없이 동작)
 * - JSON 파일에 접수 저장
 * - 가능하면 mail() 알림
 *
 * URL: /api/danbi-inquiry-mailbox.php (POST)
 */
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function danbi_mailbox_json($success, $message, $extra = array())
{
    $payload = array_merge(
        array(
            'success' => (bool) $success,
            'message' => (string) $message,
        ),
        $extra
    );
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    danbi_mailbox_json(false, '잘못된 요청입니다.');
}

/* honeypot */
if (!empty($_POST['website_url'])) {
    danbi_mailbox_json(false, '접수할 수 없습니다.');
}

$name = isset($_POST['name']) ? trim(strip_tags((string) $_POST['name'])) : '';
$phone = isset($_POST['phone']) ? trim(strip_tags((string) $_POST['phone'])) : '';
$message = isset($_POST['message']) ? trim(strip_tags((string) $_POST['message'])) : '';
$privacy = !empty($_POST['privacy_agree']) ? '동의' : '';
$referer = isset($_POST['referer_page']) ? trim(strip_tags((string) $_POST['referer_page'])) : '';

if ($name === '' || mb_strlen($name, 'UTF-8') > 50) {
    danbi_mailbox_json(false, '이름을 확인해 주세요.');
}
$digits = preg_replace('/[^0-9]/', '', $phone);
if ($digits === '' || strlen($digits) < 9 || strlen($digits) > 15) {
    danbi_mailbox_json(false, '연락처 형식을 확인해 주세요.');
}
if ($message === '' || mb_strlen($message, 'UTF-8') < 10) {
    danbi_mailbox_json(false, '문의내용을 10자 이상 입력해 주세요.');
}
if ($privacy === '') {
    danbi_mailbox_json(false, '개인정보 수집·이용에 동의해 주세요.');
}

$ip = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '';
$inbox_dir = dirname(__FILE__) . '/../plugin/onoff-builder-bridge/imports/danbicar';
if (!is_dir($inbox_dir)) {
    @mkdir($inbox_dir, 0755, true);
}
$rate_file = $inbox_dir . '/inquiry-rate-' . md5($ip !== '' ? $ip : 'unknown') . '.txt';
$now = time();
if (is_file($rate_file)) {
    $last = (int) @file_get_contents($rate_file);
    if ($last > 0 && ($now - $last) < 60) {
        danbi_mailbox_json(false, '잠시 후 다시 시도해 주세요.');
    }
}

$inbox_file = $inbox_dir . '/inquiry-inbox.json';
$items = array();
if (is_file($inbox_file)) {
    $raw = @file_get_contents($inbox_file);
    $decoded = json_decode((string) $raw, true);
    if (is_array($decoded)) {
        $items = $decoded;
    }
}

$id = date('YmdHis') . '-' . substr(md5(uniqid((string) mt_rand(), true)), 0, 8);
$entry = array(
    'id' => $id,
    'name' => $name,
    'phone' => $phone,
    'phone_tail' => substr($digits, -4),
    'message' => $message,
    'privacy' => $privacy,
    'referer_page' => $referer,
    'ip' => $ip,
    'status' => '상담 접수',
    'created_at' => date('c'),
);

array_unshift($items, $entry);
if (count($items) > 500) {
    $items = array_slice($items, 0, 500);
}

$written = @file_put_contents(
    $inbox_file,
    json_encode($items, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT),
    LOCK_EX
);
if ($written === false) {
    danbi_mailbox_json(false, '접수 저장에 실패했습니다. 전화(1599-4950) 또는 카카오톡으로 문의해 주세요.');
}
@file_put_contents($rate_file, (string) $now, LOCK_EX);

/* 상태 조회용 샘플 피드에도 반영(선택) — consultations 앞쪽에 추가하지 않음(개인정보). phone_tail만 별도 맵 */
$lookup_file = $inbox_dir . '/inquiry-lookup.json';
$lookup = array();
if (is_file($lookup_file)) {
    $lr = json_decode((string) @file_get_contents($lookup_file), true);
    if (is_array($lr)) {
        $lookup = $lr;
    }
}
$lookup[] = array(
    'tail' => substr($digits, -4),
    'name_mask' => function_exists('mb_substr')
        ? (mb_substr($name, 0, 1, 'UTF-8') . '○○님')
        : (substr($name, 0, 1) . '○○님'),
    'status' => '상담 접수',
    'created_at' => date('Y-m-d'),
    'id' => $id,
);
if (count($lookup) > 300) {
    $lookup = array_slice($lookup, -300);
}
@file_put_contents($lookup_file, json_encode($lookup, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);

/* 이메일 알림 — _site.config.php 파싱(실행하지 않음) */
$notify_email = '';
$cfg = '';
$site_config_file = dirname(__FILE__) . '/../_site.config.php';
if (is_file($site_config_file)) {
    $cfg = (string) @file_get_contents($site_config_file);
    if (preg_match("/'inquiry_notify_email'\\s*=>\\s*'([^']*)'/", $cfg, $m)) {
        $notify_email = trim($m[1]);
    }
    $notify_on = true;
    if (preg_match("/'inquiry_notify_enabled'\\s*=>\\s*(true|false)/", $cfg, $m2)) {
        $notify_on = ($m2[1] === 'true');
    }
    if (!$notify_on) {
        $notify_email = '';
    }
    if ($notify_email === 'admin@example.com') {
        $notify_email = '';
    }
}

$mail_sent = false;
if ($notify_email !== '' && filter_var($notify_email, FILTER_VALIDATE_EMAIL) && function_exists('mail')) {
    $subject = '[단비카] 상담 문의 접수 - ' . $name;
    $body = "단비카 웹 상담 문의가 접수되었습니다.\n\n"
        . "이름: {$name}\n"
        . "연락처: {$phone}\n"
        . "일시: " . date('Y-m-d H:i:s') . "\n"
        . "IP: {$ip}\n"
        . "페이지: {$referer}\n\n"
        . "--- 문의내용 ---\n{$message}\n";
    $headers = "From: noreply@vone.kr\r\nContent-Type: text/plain; charset=UTF-8\r\n";
    $mail_sent = @mail($notify_email, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
}

/* 텔레그램 알림 (설정 파싱) */
$telegram_sent = false;
$tg_token = '';
$tg_chat = '';
$tg_on = false;
if (isset($cfg) && is_string($cfg) && $cfg !== '') {
    if (preg_match("/'inquiry_notify_telegram_enabled'\\s*=>\\s*(true|false)/", $cfg, $tm)) {
        $tg_on = ($tm[1] === 'true');
    }
    if (preg_match("/'inquiry_notify_telegram_bot_token'\\s*=>\\s*'([^']*)'/", $cfg, $tm)) {
        $tg_token = trim($tm[1]);
    }
    if (preg_match("/'inquiry_notify_telegram_chat_id'\\s*=>\\s*'([^']*)'/", $cfg, $tm)) {
        $tg_chat = trim($tm[1]);
    }
}
if ($tg_on && $tg_token !== '' && $tg_chat !== '') {
    $tg_text = "단비카 상담 문의\n이름: {$name}\n연락처: {$phone}\n\n{$message}";
    $tg_url = 'https://api.telegram.org/bot' . rawurlencode($tg_token) . '/sendMessage';
    $tg_payload = http_build_query(array(
        'chat_id' => $tg_chat,
        'text' => $tg_text,
    ));
    $ctx = stream_context_create(array(
        'http' => array(
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $tg_payload,
            'timeout' => 5,
            'ignore_errors' => true,
        ),
    ));
    $tg_res = @file_get_contents($tg_url, false, $ctx);
    if (is_string($tg_res) && strpos($tg_res, '"ok":true') !== false) {
        $telegram_sent = true;
    }
}

danbi_mailbox_json(
    true,
    '상담 신청이 접수되었습니다. 영업시간 기준 순차적으로 연락드립니다.',
    array(
        'id' => $id,
        'mail_sent' => $mail_sent,
        'telegram_sent' => $telegram_sent,
        'redirect_url' => '',
    )
);

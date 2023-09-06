<?php
$time_start = microtime(true);

$xValue = $_POST["xChoosing"];
$yValue = $_POST["yChoosing"];
$rValue = $_POST["rChoosing"];

function checkRectangle($x, $y, $r): bool
{
    return ($x <= 0 && $y <= 0 && $x >= -$r && $y >= -($r/2));
}

function checkTriangle($x, $y, $r): bool {
    return $x >= 0 && $y <= 0 && ($y >= $x - $r);
}

function checkArc($x, $y, $r): bool {
    return $x >= 0 && $y >= 0 && (pow($x, 2) + pow($y, 2) <= pow($r/2, 2));
}

function validateValues($x, $y, $r): bool {
    return checkRectangle($x, $y, $r) || checkTriangle($x, $y, $r) || checkArc($x, $y, $r);
}

$res = validateValues($xValue, $yValue, $rValue) ? "YES" : "NO";

$scriptTime = (microtime(true) - $time_start) * 1000;
$formatTime = number_format((float) $scriptTime, 5, '.', '');

$jsonResponse =
    "{" .
    "\"result\":\"$res\"," .
    "\"executing\":\"$formatTime\"," .
    "\"x\":\"$xValue\"," .
    "\"y\":\"$yValue\"," .
    "\"r\":\"$rValue\"" .
    "}";

echo $jsonResponse;
<?php
/**
 * One-off favicon generator: crops the transparent/white padding off
 * public/images/branding/Icon.png, then resamples the square hexagon
 * mark down to each favicon size. Run with: php scripts/generate-favicons.php
 */

$publicDir = __DIR__ . '/../public';
$source = $publicDir . '/images/branding/Icon.png';

if (!file_exists($source)) {
    fwrite(STDERR, "Source icon not found: {$source}\n");
    exit(1);
}

$src = imagecreatefrompng($source);
imagesavealpha($src, true);
$srcW = imagesx($src);
$srcH = imagesy($src);

// --- Find the bounding box of non-white / non-transparent content ---
$minX = $srcW; $minY = $srcH; $maxX = 0; $maxY = 0;
$found = false;

// Sample on a coarse grid first pass for speed, then refine with a tighter scan
$step = 2;
for ($y = 0; $y < $srcH; $y += $step) {
    for ($x = 0; $x < $srcW; $x += $step) {
        $rgba = imagecolorat($src, $x, $y);
        $alpha = ($rgba >> 24) & 0x7F;
        $r = ($rgba >> 16) & 0xFF;
        $g = ($rgba >> 8) & 0xFF;
        $b = $rgba & 0xFF;

        // "content" = not fully transparent AND not near-white
        $isWhiteish = $r > 245 && $g > 245 && $b > 245;
        if ($alpha < 120 && !$isWhiteish) {
            $found = true;
            if ($x < $minX) $minX = $x;
            if ($y < $minY) $minY = $y;
            if ($x > $maxX) $maxX = $x;
            if ($y > $maxY) $maxY = $y;
        }
    }
}

if (!$found) {
    fwrite(STDERR, "Could not detect any non-white content in the source image.\n");
    exit(1);
}

// Pad the crop box by ~4% of its size on each side for breathing room
$boxW = $maxX - $minX;
$boxH = $maxY - $minY;
$pad = (int) round(max($boxW, $boxH) * 0.06);
$minX = max(0, $minX - $pad);
$minY = max(0, $minY - $pad);
$maxX = min($srcW, $maxX + $pad);
$maxY = min($srcH, $maxY + $pad);

// Make it square around the content's center so the mark isn't stretched
$boxW = $maxX - $minX;
$boxH = $maxY - $minY;
$side = max($boxW, $boxH);
$cx = (int) round(($minX + $maxX) / 2);
$cy = (int) round(($minY + $maxY) / 2);
$cropX = max(0, $cx - (int) round($side / 2));
$cropY = max(0, $cy - (int) round($side / 2));
if ($cropX + $side > $srcW) $cropX = $srcW - $side;
if ($cropY + $side > $srcH) $cropY = $srcH - $side;

fwrite(STDOUT, "Detected content box: x={$minX},y={$minY} to x={$maxX},y={$maxY}\n");
fwrite(STDOUT, "Square crop: x={$cropX},y={$cropY}, side={$side}\n");

// --- Crop to a square transparent canvas ---
$square = imagecreatetruecolor($side, $side);
imagealphablending($square, false);
imagesavealpha($square, true);
$transparent = imagecolorallocatealpha($square, 0, 0, 0, 127);
imagefilledrectangle($square, 0, 0, $side, $side, $transparent);
imagealphablending($square, true);
imagecopy($square, $src, 0, 0, $cropX, $cropY, $side, $side);

function saveResized($square, int $size, string $path): void
{
    $out = imagecreatetruecolor($size, $size);
    imagealphablending($out, false);
    imagesavealpha($out, true);
    $transparent = imagecolorallocatealpha($out, 0, 0, 0, 127);
    imagefilledrectangle($out, 0, 0, $size, $size, $transparent);
    imagealphablending($out, true);
    imagecopyresampled($out, $square, 0, 0, 0, 0, $size, $size, imagesx($square), imagesy($square));
    imagepng($out, $path, 9);
    imagedestroy($out);
    fwrite(STDOUT, "Wrote {$path} ({$size}x{$size})\n");
}

saveResized($square, 16, $publicDir . '/favicon-16x16.png');
saveResized($square, 32, $publicDir . '/favicon-32x32.png');
saveResized($square, 48, $publicDir . '/favicon-48x48-tmp.png');
saveResized($square, 180, $publicDir . '/apple-touch-icon.png');
saveResized($square, 192, $publicDir . '/android-chrome-192x192.png');
saveResized($square, 512, $publicDir . '/android-chrome-512x512.png');

// --- Build a real multi-resolution .ico (PNG-embedded ICO format, supported since Vista) ---
function pngData(string $path): string
{
    return file_get_contents($path);
}

$icoSizes = [16, 32, 48];
$images = [
    16 => pngData($publicDir . '/favicon-16x16.png'),
    32 => pngData($publicDir . '/favicon-32x32.png'),
    48 => pngData($publicDir . '/favicon-48x48-tmp.png'),
];

$count = count($icoSizes);
$header = pack('vvv', 0, 1, $count); // reserved, type=1 (icon), count

$dirEntries = '';
$imageData = '';
$offset = 6 + (16 * $count); // header + directory entries

foreach ($icoSizes as $size) {
    $data = $images[$size];
    $len = strlen($data);
    $w = $size === 256 ? 0 : $size;
    $h = $size === 256 ? 0 : $size;
    $dirEntries .= pack('CCCCvvVV', $w, $h, 0, 0, 1, 32, $len, $offset);
    $imageData .= $data;
    $offset += $len;
}

file_put_contents($publicDir . '/favicon.ico', $header . $dirEntries . $imageData);
fwrite(STDOUT, "Wrote {$publicDir}/favicon.ico (multi-res: " . implode(',', $icoSizes) . ")\n");

unlink($publicDir . '/favicon-48x48-tmp.png');

imagedestroy($square);
imagedestroy($src);

fwrite(STDOUT, "Done.\n");

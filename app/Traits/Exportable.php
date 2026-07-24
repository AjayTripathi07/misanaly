<?php

namespace App\Traits;

use Symfony\Component\HttpFoundation\StreamedResponse;

trait Exportable
{
    /**
     * Stream a UTF-8 (BOM) CSV download - opens cleanly in Excel, including ₹ and non-ASCII text.
     *
     * @param string $baseName file name without date/extension, e.g. "leads"
     * @param array<int, string> $headers column header row
     * @param iterable<array<int, mixed>> $rows each item is an array of column values, same order as $headers
     */
    protected function exportCsv(string $baseName, array $headers, iterable $rows): StreamedResponse
    {
        $filename = sprintf('%s-export-%s.csv', $baseName, now()->format('Y-m-d'));

        return response()->streamDownload(function () use ($headers, $rows) {
            $handle = fopen('php://output', 'w');
            fwrite($handle, "\xEF\xBB\xBF");
            fputcsv($handle, $headers);
            foreach ($rows as $row) {
                fputcsv($handle, $row);
            }
            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }
}

<?php

namespace App\Traits;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
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

    /**
     * Stream a real .xlsx download via PhpSpreadsheet - xlsx is UTF-8 XML internally,
     * so ₹ and other Unicode characters need no BOM/encoding tricks.
     *
     * @param string $baseName file name without date/extension, e.g. "leads"
     * @param array<int, string> $headers column header row
     * @param iterable<array<int, mixed>> $rows each item is an array of column values, same order as $headers
     */
    protected function exportXlsx(string $baseName, array $headers, iterable $rows): StreamedResponse
    {
        $filename = sprintf('%s-export-%s.xlsx', $baseName, now()->format('Y-m-d'));

        return response()->streamDownload(function () use ($headers, $rows) {
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();

            $sheet->fromArray($headers, null, 'A1');
            $sheet->getStyle('A1:' . $sheet->getHighestColumn() . '1')->getFont()->setBold(true);

            $rowNum = 2;
            foreach ($rows as $row) {
                $sheet->fromArray($row, null, 'A' . $rowNum);
                $rowNum++;
            }

            foreach (range('A', $sheet->getHighestColumn()) as $column) {
                $sheet->getColumnDimension($column)->setAutoSize(true);
            }

            (new Xlsx($spreadsheet))->save('php://output');
        }, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]);
    }
}

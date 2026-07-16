<?php
namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductFeature;
use App\Models\ProductPricingTier;
use Illuminate\Database\Seeder;

class ProductsSeeder extends Seeder
{
    public function run(): void
    {
        // Clean up old slugs if they exist (preserves the row's id so waitlist links stay intact)
        Product::where('slug', 'tally-automation')->update(['slug' => 'statement2books']);
        Product::where('slug', 'bank2books')->update(['slug' => 'statement2books']);

        $product = Product::updateOrCreate(
            ['slug' => 'statement2books'],
            [
                'name'          => 'Statement2Books',
                'tagline'       => 'Convert Bank Statements into Tally Entries in Seconds',
                'description'   => "Statement2Books is NobelIQ Technologies' flagship desktop application that converts bank statements from all major Indian banks — SBI, HDFC, Punjab National Bank, ICICI, Axis, Kotak, and more — directly into Tally-ready accounting entries.\n\nUpload your bank statement in PDF, Excel, or CSV format. Statement2Books AI engine reads the transactions, intelligently categorises them using 160+ auto-tagging rules, and generates the correct journal entries in seconds. No cloud. No data upload. Everything runs fully offline on your machine.\n\nBuilt for Chartered Accountant firms and accounting professionals who are tired of spending hours manually entering bank data into Tally ERP. Statement2Books eliminates the drudgery so you can focus on higher-value work.\n\nSupports multi-company Tally setups, batch processing of multiple statements, and exports a clean audit trail before pushing entries to Tally — giving you full control with zero errors.",
                'status'        => 'active',
                'pricing_model' => 'one-time',
                'demo_url'      => null,
                'sort_order'    => 1,
                'is_featured'   => true,
            ]
        );

        $features = [
            [
                'title'       => 'AI Statement Reader',
                'description' => 'Purpose-built AI reads every row of a bank statement — no matter the layout — and understands what each transaction means.',
                'icon'        => 'Brain',
                'sort_order'  => 1,
            ],
            [
                'title'       => 'PDF Import',
                'description' => 'Drop in a PDF statement straight from your bank\'s net-banking portal — Statement2Books extracts every table automatically.',
                'icon'        => 'FileText',
                'sort_order'  => 2,
            ],
            [
                'title'       => 'Scanned OCR',
                'description' => 'Even scanned or photographed statements are parsed accurately using built-in OCR — no need for a clean digital export.',
                'icon'        => 'ScanLine',
                'sort_order'  => 3,
            ],
            [
                'title'       => 'Auto Ledger Mapping',
                'description' => 'Every transaction is automatically matched to the correct Tally ledger head using 160+ auto-tagging rules.',
                'icon'        => 'ListTree',
                'sort_order'  => 4,
            ],
            [
                'title'       => 'Voucher Creation',
                'description' => 'Journal, payment, and receipt vouchers are generated automatically — ready for review, not manual re-entry.',
                'icon'        => 'ClipboardCheck',
                'sort_order'  => 5,
            ],
            [
                'title'       => 'Multi-Bank Support',
                'description' => 'Import statements from SBI, HDFC, Punjab National Bank, ICICI, Axis, Kotak, Bank of Baroda, and 20+ other Indian banks.',
                'icon'        => 'Building2',
                'sort_order'  => 6,
            ],
            [
                'title'       => 'Bulk Processing',
                'description' => 'Process multiple statements across multiple companies in a single batch — built for firms handling dozens of clients.',
                'icon'        => 'Layers',
                'sort_order'  => 7,
            ],
            [
                'title'       => 'Tally Export',
                'description' => 'Push clean, audit-trailed entries directly into Tally ERP/Prime in one click, with full multi-company support.',
                'icon'        => 'Send',
                'sort_order'  => 8,
            ],
            [
                'title'       => 'Excel Export',
                'description' => 'Prefer a spreadsheet first? Export every processed transaction to a clean, formatted Excel workbook.',
                'icon'        => 'Sheet',
                'sort_order'  => 9,
            ],
            [
                'title'       => 'GST Ready',
                'description' => 'Transactions are tagged with GST-relevant metadata automatically, keeping your books reconciliation-ready.',
                'icon'        => 'FileCheck2',
                'sort_order'  => 10,
            ],
            [
                'title'       => '100% Offline',
                'description' => 'Statement2Books runs entirely on your machine. No cloud upload, no internet dependency after installation.',
                'icon'        => 'Shield',
                'sort_order'  => 11,
            ],
            [
                'title'       => 'High Accuracy AI',
                'description' => 'Our AI heuristic model consistently hits 98.7% categorisation accuracy across all supported banks.',
                'icon'        => 'Target',
                'sort_order'  => 12,
            ],
        ];

        foreach ($features as $feature) {
            ProductFeature::updateOrCreate(
                ['product_id' => $product->id, 'title' => $feature['title']],
                $feature + ['product_id' => $product->id],
            );
        }

        // Remove old feature titles that no longer apply
        ProductFeature::where('product_id', $product->id)
            ->whereNotIn('title', array_column($features, 'title'))
            ->delete();

        $tiers = [
            [
                'name'          => 'Basic',
                'price'         => 4999.00,
                'features_json' => [
                    'Single company',
                    'Up to 500 entries/month',
                    'SBI, HDFC, PNB support',
                    'PDF & Excel import',
                    '50 auto-tagging rules',
                    'Email support',
                ],
                'is_popular'    => false,
            ],
            [
                'name'          => 'Pro',
                'price'         => 9999.00,
                'features_json' => [
                    'Up to 5 companies',
                    'Unlimited entries',
                    'All 25+ Indian banks',
                    'PDF, Excel & CSV import',
                    '160+ auto-tagging rules',
                    'Batch processing',
                    'Priority support',
                    'Free updates for 1 year',
                ],
                'is_popular'    => true,
            ],
            [
                'name'          => 'Enterprise',
                'price'         => null,
                'features_json' => [
                    'Unlimited companies',
                    'Unlimited entries',
                    'All banks + custom formats',
                    'Custom tagging rules',
                    'API access',
                    'On-site training',
                    'Dedicated account manager',
                    'Custom SLA',
                ],
                'is_popular'    => false,
            ],
        ];

        foreach ($tiers as $tier) {
            ProductPricingTier::updateOrCreate(
                ['product_id' => $product->id, 'name' => $tier['name']],
                $tier + ['product_id' => $product->id],
            );
        }
    }
}

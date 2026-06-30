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
        // Clean up old slug if it exists
        Product::where('slug', 'tally-automation')->update(['slug' => 'bank2books']);

        $product = Product::updateOrCreate(
            ['slug' => 'bank2books'],
            [
                'name'          => 'Bank2Books',
                'tagline'       => 'Convert Bank Statements into Tally Entries in Seconds',
                'description'   => "Bank2Books is MSI Analytics' flagship desktop application that converts bank statements from all major Indian banks — SBI, HDFC, Punjab National Bank, ICICI, Axis, Kotak, and more — directly into Tally-ready accounting entries.\n\nUpload your bank statement in PDF, Excel, or CSV format. Bank2Books AI engine reads the transactions, intelligently categorises them using 160+ auto-tagging rules, and generates the correct journal entries in seconds. No cloud. No data upload. Everything runs fully offline on your machine.\n\nBuilt for Chartered Accountant firms and accounting professionals who are tired of spending hours manually entering bank data into Tally ERP. Bank2Books eliminates the drudgery so you can focus on higher-value work.\n\nSupports multi-company Tally setups, batch processing of multiple statements, and exports a clean audit trail before pushing entries to Tally — giving you full control with zero errors.",
                'status'        => 'active',
                'pricing_model' => 'one-time',
                'demo_url'      => null,
                'sort_order'    => 1,
            ]
        );

        $features = [
            [
                'title'       => 'All Major Indian Banks Supported',
                'description' => 'Import bank statements from SBI, HDFC, Punjab National Bank, ICICI, Axis, Kotak, Bank of Baroda, and 20+ other Indian banks. PDF, Excel, and CSV formats all accepted.',
                'icon'        => 'Building2',
                'sort_order'  => 1,
            ],
            [
                'title'       => '160+ AI Auto-Tagging Rules',
                'description' => 'Intelligent rule engine automatically categorises every transaction into the correct Tally ledger — salary, GST, TDS, vendor payments, bank charges, and more.',
                'icon'        => 'Brain',
                'sort_order'  => 2,
            ],
            [
                'title'       => '100% Offline — Your Data Stays Local',
                'description' => 'Bank2Books runs entirely on your machine. No cloud upload, no internet dependency after installation. Your clients\' financial data never leaves your computer.',
                'icon'        => 'Shield',
                'sort_order'  => 3,
            ],
            [
                'title'       => 'Audit Trail & One-Click Tally Export',
                'description' => 'Every auto-matched entry is logged with a full audit trail. Review and edit before exporting directly to Tally XML — clean, accurate, and compliant.',
                'icon'        => 'ClipboardCheck',
                'sort_order'  => 4,
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

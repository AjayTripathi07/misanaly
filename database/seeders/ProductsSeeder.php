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
        $product = Product::updateOrCreate(
            ['slug' => 'tally-automation'],
            [
                'name'          => 'Tally Automation',
                'tagline'       => 'Automate Tally ERP data entry for CA firms',
                'description'   => "Tally Automation is MSI Analytics' flagship desktop application built specifically for Chartered Accountant firms and accounting professionals. It eliminates the manual, error-prone process of entering data into Tally ERP by automating the entire workflow.\n\nThe software reads data from PDFs, Excel sheets, and JSON exports, intelligently categorises transactions using 160+ auto-tagging rules, and pushes the entries directly into Tally—saving hours of repetitive work every day.\n\nWith multi-company support, batch processing, and a clean audit trail, Tally Automation is the productivity tool every CA firm needs.",
                'status'        => 'active',
                'pricing_model' => 'one-time',
                'demo_url'      => null,
                'sort_order'    => 1,
            ]
        );

        $features = [
            [
                'title'       => '160+ Auto-Tagging Rules',
                'description' => 'Intelligent rule engine that automatically categorises transactions into the correct ledger heads—covering salary, GST, TDS, expenses, and more.',
                'icon'        => 'Tags',
                'sort_order'  => 1,
            ],
            [
                'title'       => 'Multi-Company Support',
                'description' => 'Manage data entry for unlimited Tally companies from a single interface. Switch contexts instantly without re-entering credentials.',
                'icon'        => 'Building2',
                'sort_order'  => 2,
            ],
            [
                'title'       => 'PDF & JSON Import',
                'description' => 'Import bank statements, invoices, and payroll data from PDF and JSON formats. The parser handles multiple bank formats out of the box.',
                'icon'        => 'FileJson',
                'sort_order'  => 3,
            ],
            [
                'title'       => 'Audit Trail & Export',
                'description' => 'Every automated entry is logged with a full audit trail. Export processed data to Excel or PDF for review before pushing to Tally.',
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

        $tiers = [
            [
                'name'          => 'Basic',
                'price'         => 4999.00,
                'features_json' => [
                    'Single company',
                    'Up to 500 entries/month',
                    '50 auto-tagging rules',
                    'PDF import',
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
                    '160+ auto-tagging rules',
                    'PDF & JSON import',
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
                    'Custom tagging rules',
                    'All import formats',
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

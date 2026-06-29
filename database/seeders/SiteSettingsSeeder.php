<?php
namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'site_name'   => 'MSI Analytics',
            'tagline'     => 'Innovative IT Solutions & Products',
            'email'       => 'info@misanaly.in',
            'phone'       => '+91-XXXXXXXXXX',
            'address'     => 'Delhi, India',
            'facebook'    => '',
            'twitter'     => '',
            'linkedin'    => '',
            'instagram'   => '',
            'description' => 'MSI Analytics delivers end-to-end IT services and software products designed to transform businesses through technology.',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}

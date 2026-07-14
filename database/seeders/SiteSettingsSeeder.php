<?php
namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'site_name'    => 'NobelIQ Technologies',
            'tagline'      => 'Innovative IT Solutions & Products',
            'email'        => 'info@misanaly.in',
            'phone'        => '+91-XXXXXXXXXX',
            'address'      => 'Delhi, India',
            'facebook'     => '',
            'twitter'      => '',
            'linkedin'     => '',
            'instagram'    => '',
            'description'  => 'NobelIQ Technologies delivers end-to-end IT services and software products designed to transform businesses through technology.',
            'gst_number'   => '',
            'cin_number'   => '',
            'udyam_number' => 'UDYAM-MP-40-0050255',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}

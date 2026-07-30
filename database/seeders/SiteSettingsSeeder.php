<?php
namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // Company Info
            'site_name'                => 'NobelIQ Technologies',
            'tagline'                  => 'Innovative IT Solutions & Products',
            'email'                    => 'info@nobeliq.in',
            'phone'                    => '+91-7697827926',
            'address'                  => 'In front of Omkar Hotel, Gaushala Chowk, Satna, Madhya Pradesh 485001',
            'description'              => 'NobelIQ Technologies delivers end-to-end IT services and software products designed to transform businesses through technology.',
            // Business Registration
            'gst_number'               => '',
            'cin_number'               => '',
            'udyam_number'             => 'UDYAM-MP-40-0050255',
            // Social Media Links
            'facebook'                 => '',
            'twitter'                  => '',
            'linkedin'                 => '',
            'instagram'                => '',
            'youtube_url'              => '',
            'whatsapp_number'          => '',
            // Footer Content
            'footer_description'       => 'Innovative IT solutions and software products designed to transform businesses through technology.',
            'footer_copyright_text'    => '© {year} NobelIQ Technologies. All rights reserved.',
            // Homepage Stats
            'stat_1_number'            => '10+',
            'stat_1_label'             => 'CA Firms',
            'stat_2_number'            => '100+',
            'stat_2_label'             => 'Bank Formats',
            'stat_3_number'            => '98.7%',
            'stat_3_label'             => 'Accuracy Rate',
            'stat_4_number'            => '3 hrs',
            'stat_4_label'             => 'Saved Daily',
            // Contact & Communication
            'admin_notification_email' => '',
            'business_hours'           => 'Mon-Sat, 10 AM - 7 PM IST',
            // SEO & Tracking
            'default_meta_description' => '',
            'og_image_url'             => '',
            'gtm_container_id'         => 'GTM-TL2V782R',
            'google_analytics_id'      => 'G-HX1M5TT1YJ',
            'meta_pixel_id'            => '',
            // Site Behavior
            'maintenance_mode'         => '0',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}

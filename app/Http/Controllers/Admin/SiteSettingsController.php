<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteSettingsController extends Controller
{
    public function index()
    {
        $settings = SiteSetting::all()->pluck('value', 'key')->toArray();

        $defaults = [
            // Company Info
            'site_name'                  => '',
            'tagline'                    => '',
            'email'                      => '',
            'phone'                      => '',
            'address'                    => '',
            // Business Registration
            'gst_number'                 => '',
            'cin_number'                 => '',
            'udyam_number'               => 'UDYAM-MP-40-0050255',
            // Social Media Links
            'facebook'                   => '',
            'twitter'                    => '',
            'linkedin'                   => '',
            'instagram'                  => '',
            'youtube_url'                => '',
            'whatsapp_number'            => '',
            // Footer Content
            'footer_description'         => '',
            'footer_copyright_text'      => '© {year} NobelIQ Technologies. All rights reserved.',
            // Homepage Stats
            'stat_1_number'              => '10+',
            'stat_1_label'               => 'CA Firms',
            'stat_2_number'              => '100+',
            'stat_2_label'               => 'Bank Formats',
            'stat_3_number'              => '98.7%',
            'stat_3_label'               => 'Accuracy Rate',
            'stat_4_number'              => '3 hrs',
            'stat_4_label'               => 'Saved Daily',
            // Contact & Communication
            'admin_notification_email'   => '',
            'business_hours'             => '',
            // SEO & Tracking
            'default_meta_description'   => '',
            'og_image_url'               => '',
            'google_analytics_id'        => '',
            'meta_pixel_id'              => '',
            // Site Behavior
            'maintenance_mode'           => '0',
        ];

        return Inertia::render('Admin/Settings/Index', [
            'settings' => array_merge($defaults, $settings),
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            // Company Info
            'site_name'                => ['required', 'string', 'max:255'],
            'tagline'                  => ['nullable', 'string', 'max:500'],
            'email'                    => ['nullable', 'email', 'max:255'],
            'phone'                    => ['nullable', 'string', 'max:50'],
            'address'                  => ['nullable', 'string', 'max:500'],
            // Business Registration
            'gst_number'               => ['nullable', 'string', 'max:255'],
            'cin_number'               => ['nullable', 'string', 'max:255'],
            'udyam_number'             => ['nullable', 'string', 'max:255'],
            // Social Media Links
            'facebook'                 => ['nullable', 'string', 'max:500'],
            'twitter'                  => ['nullable', 'string', 'max:500'],
            'linkedin'                 => ['nullable', 'string', 'max:500'],
            'instagram'                => ['nullable', 'string', 'max:500'],
            'youtube_url'              => ['nullable', 'string', 'max:500'],
            'whatsapp_number'          => ['nullable', 'string', 'max:20', 'regex:/^[0-9]*$/'],
            // Footer Content
            'footer_description'       => ['nullable', 'string', 'max:500'],
            'footer_copyright_text'    => ['nullable', 'string', 'max:255'],
            // Homepage Stats
            'stat_1_number'            => ['nullable', 'string', 'max:20'],
            'stat_1_label'             => ['nullable', 'string', 'max:50'],
            'stat_2_number'            => ['nullable', 'string', 'max:20'],
            'stat_2_label'             => ['nullable', 'string', 'max:50'],
            'stat_3_number'            => ['nullable', 'string', 'max:20'],
            'stat_3_label'             => ['nullable', 'string', 'max:50'],
            'stat_4_number'            => ['nullable', 'string', 'max:20'],
            'stat_4_label'             => ['nullable', 'string', 'max:50'],
            // Contact & Communication
            'admin_notification_email' => ['nullable', 'email', 'max:255'],
            'business_hours'           => ['nullable', 'string', 'max:255'],
            // SEO & Tracking
            'default_meta_description' => ['nullable', 'string', 'max:500'],
            'og_image_url'             => ['nullable', 'string', 'max:500'],
            'google_analytics_id'      => ['nullable', 'string', 'max:50'],
            'meta_pixel_id'            => ['nullable', 'string', 'max:50'],
            // Site Behavior
            'maintenance_mode'         => ['nullable', 'in:0,1'],
        ]);

        foreach ($data as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value ?? '']);
        }

        return back()->with('success', 'Settings saved.');
    }
}

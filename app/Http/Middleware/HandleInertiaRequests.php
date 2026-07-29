<?php

namespace App\Http\Middleware;

use App\Models\Product;
use App\Models\ProductWaitlist;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        $settingKeys = [
            'gst_number', 'cin_number', 'udyam_number',
            'facebook', 'twitter', 'linkedin', 'instagram', 'youtube_url', 'whatsapp_number',
            'footer_description', 'footer_copyright_text',
            'email', 'phone', 'address', 'business_hours',
        ];
        $settings = SiteSetting::whereIn('key', $settingKeys)->pluck('value', 'key');

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'waitlist_pending' => $user?->is_admin
                ? ProductWaitlist::where('status', 'pending')->count()
                : null,
            'flash' => [
                'success'          => $request->session()->get('success'),
                'waitlist_success' => $request->session()->get('waitlist_success'),
            ],
            'siteSettings' => [
                'gst_number'             => $settings->get('gst_number', ''),
                'cin_number'             => $settings->get('cin_number', ''),
                'udyam_number'           => $settings->get('udyam_number', ''),
                'facebook'               => $settings->get('facebook', ''),
                'twitter'                => $settings->get('twitter', ''),
                'linkedin'               => $settings->get('linkedin', ''),
                'instagram'              => $settings->get('instagram', ''),
                'youtube_url'            => $settings->get('youtube_url', ''),
                'whatsapp_number'        => $settings->get('whatsapp_number', ''),
                'footer_description'     => $settings->get('footer_description', ''),
                'footer_copyright_text'  => $settings->get('footer_copyright_text', '© {year} NobelIQ Technologies. All rights reserved.'),
                'email'                  => $settings->get('email', ''),
                'phone'                  => $settings->get('phone', ''),
                'address'                => $settings->get('address', ''),
                'business_hours'         => $settings->get('business_hours', ''),
            ],
            'favoriteProduct' => Product::where('is_featured', true)
                ->select('slug', 'name', 'tagline')
                ->first(),
        ];
    }
}

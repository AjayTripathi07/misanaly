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

        $settings = SiteSetting::whereIn('key', ['gst_number', 'cin_number', 'udyam_number'])
            ->pluck('value', 'key');

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
                'gst_number'   => $settings->get('gst_number', ''),
                'cin_number'   => $settings->get('cin_number', ''),
                'udyam_number' => $settings->get('udyam_number', ''),
            ],
            'favoriteProduct' => Product::where('is_featured', true)
                ->select('slug', 'name', 'tagline')
                ->first(),
        ];
    }
}

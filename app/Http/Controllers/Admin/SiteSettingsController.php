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
            'site_name'                  => '',
            'tagline'                    => '',
            'email'                      => '',
            'phone'                      => '',
            'address'                    => '',
            'facebook'                   => '',
            'twitter'                    => '',
            'linkedin'                   => '',
            'instagram'                  => '',
            'default_meta_description'   => '',
            'og_image_url'               => '',
        ];

        return Inertia::render('Admin/Settings/Index', [
            'settings' => array_merge($defaults, $settings),
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'site_name'                => ['required', 'string', 'max:255'],
            'tagline'                  => ['nullable', 'string', 'max:500'],
            'email'                    => ['nullable', 'email', 'max:255'],
            'phone'                    => ['nullable', 'string', 'max:50'],
            'address'                  => ['nullable', 'string', 'max:500'],
            'facebook'                 => ['nullable', 'string', 'max:500'],
            'twitter'                  => ['nullable', 'string', 'max:500'],
            'linkedin'                 => ['nullable', 'string', 'max:500'],
            'instagram'                => ['nullable', 'string', 'max:500'],
            'default_meta_description' => ['nullable', 'string', 'max:500'],
            'og_image_url'             => ['nullable', 'string', 'max:500'],
        ]);

        foreach ($data as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value ?? '']);
        }

        return back()->with('success', 'Settings saved.');
    }
}

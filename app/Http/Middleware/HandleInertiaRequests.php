<?php

namespace App\Http\Middleware;

use App\Models\ProductWaitlist;
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
        ];
    }
}

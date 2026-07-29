<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckMaintenanceMode
{
    /**
     * Routes that must stay reachable even in maintenance mode, so an admin
     * can still log in and flip the setting back off.
     */
    private const BYPASS_PATTERNS = [
        'admin', 'admin/*',
        'login', 'logout', 'register',
        'forgot-password', 'reset-password/*',
        'verify-email', 'verify-email/*', 'email/verification-notification',
        'confirm-password', 'password', 'dashboard',
        'up',
    ];

    public function handle(Request $request, Closure $next): Response
    {
        if (SiteSetting::get('maintenance_mode', '0') !== '1') {
            return $next($request);
        }

        if ($request->is(...self::BYPASS_PATTERNS)) {
            return $next($request);
        }

        return response()->view('maintenance', [], 503);
    }
}

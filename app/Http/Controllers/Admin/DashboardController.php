<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Lead;
use App\Models\Product;
use App\Models\Service;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $weekStart = now()->startOfWeek();

        $stats = [
            'total_leads'        => Lead::count(),
            'new_leads_week'     => Lead::where('created_at', '>=', $weekStart)->count(),
            'new_status_leads'   => Lead::where('status', 'new')->count(),
            'service_leads'      => Lead::where('lead_type', 'service')->count(),
            'product_leads'      => Lead::where('lead_type', 'product')->count(),
            'general_leads'      => Lead::where('lead_type', 'general')->count(),
            'active_services'    => Service::where('status', 'active')->count(),
            'active_products'    => Product::where('status', 'active')->count(),
            'published_posts'    => BlogPost::where('status', 'published')->count(),
        ];

        $recentLeads = Lead::with([
            'service:id,name',
            'product:id,name',
        ])
            ->latest()
            ->limit(10)
            ->get(['id', 'name', 'email', 'lead_type', 'service_id', 'product_id', 'status', 'created_at']);

        return Inertia::render('Admin/Dashboard', compact('stats', 'recentLeads'));
    }
}

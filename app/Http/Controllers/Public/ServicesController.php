<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class ServicesController extends Controller
{
    public function index(): Response
    {
        $services = Service::where('status', 'active')
            ->with(['features' => fn ($q) => $q->orderBy('sort_order')->limit(3)])
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Services/Index', compact('services'));
    }

    public function show(string $slug): Response
    {
        $service = Service::where('slug', $slug)
            ->where('status', 'active')
            ->with([
                'features'      => fn ($q) => $q->orderBy('sort_order'),
                'processSteps'  => fn ($q) => $q->orderBy('step_number'),
            ])
            ->firstOrFail();

        $relatedServices = Service::where('status', 'active')
            ->where('id', '!=', $service->id)
            ->orderBy('sort_order')
            ->limit(3)
            ->get(['id', 'slug', 'name', 'tagline', 'icon']);

        return Inertia::render('Services/Show', compact('service', 'relatedServices'));
    }
}
